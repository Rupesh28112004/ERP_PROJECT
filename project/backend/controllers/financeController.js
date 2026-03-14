import { transactions, setTransactions } from '../data/finance.js';

export const getAllTransactions = (req, res) => {
  res.json(transactions);
};

export const getTransactionById = (req, res) => {
  const transaction = transactions.find(t => t.id === parseInt(req.params.id));

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  res.json(transaction);
};

export const createTransaction = (req, res) => {
  const { type, amount, description, date } = req.body;

  const newTransaction = {
    id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
    type,
    amount,
    description,
    date
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
};
