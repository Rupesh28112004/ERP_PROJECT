import { inventory, setInventory } from '../data/inventory.js';

export const getAllInventory = (req, res) => {
  res.json(inventory);
};

export const getInventoryById = (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
};

export const createInventoryItem = (req, res) => {
  const { itemName, quantity, category, unitPrice } = req.body;

  const newItem = {
    id: inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1,
    itemName,
    quantity,
    category,
    unitPrice
  };

  inventory.push(newItem);
  res.status(201).json(newItem);
};

export const updateInventoryItem = (req, res) => {
  const id = parseInt(req.params.id);
  const { itemName, quantity, category, unitPrice } = req.body;

  const index = inventory.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  inventory[index] = { id, itemName, quantity, category, unitPrice };
  res.json(inventory[index]);
};

export const deleteInventoryItem = (req, res) => {
  const id = parseInt(req.params.id);
  const index = inventory.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  inventory.splice(index, 1);
  res.json({ message: 'Item deleted successfully' });
};
