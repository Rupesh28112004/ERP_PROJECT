export let inventory = [
  {
    id: 1,
    itemName: "Laptop",
    quantity: 20,
    category: "Electronics",
    unitPrice: 55000
  },
  {
    id: 2,
    itemName: "Office Chair",
    quantity: 50,
    category: "Furniture",
    unitPrice: 8000
  },
  {
    id: 3,
    itemName: "Printer",
    quantity: 10,
    category: "Electronics",
    unitPrice: 15000
  },
  {
    id: 4,
    itemName: "Whiteboard",
    quantity: 15,
    category: "Office Supplies",
    unitPrice: 3000
  },
  {
    id: 5,
    itemName: "Desk",
    quantity: 30,
    category: "Furniture",
    unitPrice: 12000
  },
  {
    id: 6,
    itemName: "Monitor",
    quantity: 25,
    category: "Electronics",
    unitPrice: 18000
  }
];

export const setInventory = (newInventory) => {
  inventory = newInventory;
};
