import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import {
  getAllTransactions,
  createTransaction,
  Transaction
} from '../services/financeService';

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Credit',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      type: 'Credit',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      type: 'Credit',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
      loadTransactions();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const columns = [
    { header: 'Type', accessor: 'type' },
    { header: 'Amount (₹)', accessor: 'amount' },
    { header: 'Description', accessor: 'description' },
    { header: 'Date', accessor: 'date' }
  ];

  const totalCredit = transactions
    .filter(t => t.type === 'Credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = transactions
    .filter(t => t.type === 'Debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalCredit - totalDebit;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Finance</h1>
        <Button onClick={handleOpenModal}>
          <Plus size={20} className="inline mr-2" />
          Add Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Total Credit</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{totalCredit.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Total Debit</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            ₹{totalDebit.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Balance</p>
          <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            ₹{balance.toLocaleString()}
          </p>
        </div>
      </div>

      <Table columns={columns} data={transactions} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add Transaction"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>
          <Input
            label="Amount (₹)"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
