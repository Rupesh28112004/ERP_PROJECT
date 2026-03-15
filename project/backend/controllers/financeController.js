import Transaction from '../models/Transaction.js';

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { type, amount, description, date } = req.body;

    if (!type || !amount || !description) {
      return res.status(400).json({ message: 'type, amount, and description are required' });
    }

    const newTransaction = new Transaction({ type, amount, description, date: date || new Date() });
    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
