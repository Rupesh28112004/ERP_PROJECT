import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import {
  getAllInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  InventoryItem
} from '../services/inventoryService';

export default function Inventory() {
  const [role, setRole] = useState<string>("");
  
    useEffect(() => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed = JSON.parse(userStr);
        setRole(parsed.role); // store role directly
      }
    }, []);
  
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 0,
    category: '',
    unitPrice: 0
  });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const data = await getAllInventory();
      setInventory(data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  };

  const handleOpenModal = (item?: InventoryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        itemName: item.itemName,
        quantity: item.quantity,
        category: item.category,
        unitPrice: item.unitPrice
      });
    } else {
      setEditingItem(null);
      setFormData({
        itemName: '',
        quantity: 0,
        category: '',
        unitPrice: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      itemName: '',
      quantity: 0,
      category: '',
      unitPrice: 0
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
      if (editingItem) {
        await updateInventoryItem(editingItem.id, formData);
      } else {
        await createInventoryItem(formData);
      }
      loadInventory();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteInventoryItem(id);
        loadInventory();
      } catch (error) {
        console.error('Error deleting inventory item:', error);
      }
    }
  };

  const columns = [
    { header: 'Item Name', accessor: 'itemName' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Category', accessor: 'category' },
    { header: 'Unit Price (₹)', accessor: 'unitPrice' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="inline mr-2" />
          Add Item
        </Button>
      </div>

      <Table
        columns={columns}
        data={inventory}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        role={role}

      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Item' : 'Add Item'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
          <Input
            label="Quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <Input
            label="Unit Price (₹)"
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
