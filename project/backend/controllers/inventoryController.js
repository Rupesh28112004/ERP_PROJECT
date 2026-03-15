import Inventory from '../models/Inventory.js';

export const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity, category, unitPrice } = req.body;

    if (!itemName || !category || !unitPrice) {
      return res.status(400).json({ message: 'itemName, category, and unitPrice are required' });
    }

    const newItem = new Inventory({ itemName, quantity: quantity || 0, category, unitPrice });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity, category, unitPrice } = req.body;

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { itemName, quantity, category, unitPrice },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
