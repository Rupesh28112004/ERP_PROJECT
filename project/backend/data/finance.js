export let transactions = [
  {
    id: 1,
    type: "Credit",
    amount: 50000,
    description: "Client Payment - ABC Ltd",
    date: "2024-11-20"
  },
  {
    id: 2,
    type: "Debit",
    amount: 25000,
    description: "Office Supplies Purchase",
    date: "2024-11-19"
  },
  {
    id: 3,
    type: "Credit",
    amount: 100000,
    description: "Project Milestone Payment",
    date: "2024-11-18"
  },
  {
    id: 4,
    type: "Debit",
    amount: 15000,
    description: "Software Licenses",
    date: "2024-11-17"
  },
  {
    id: 5,
    type: "Credit",
    amount: 75000,
    description: "Consulting Service Payment",
    date: "2024-11-16"
  },
  {
    id: 6,
    type: "Debit",
    amount: 30000,
    description: "Salary Payment",
    date: "2024-11-15"
  }
];

export const setTransactions = (newTransactions) => {
  transactions = newTransactions;
};
