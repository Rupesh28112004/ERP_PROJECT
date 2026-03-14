export let employees = [
  {
    id: 1,
    name: "Raman Singh",
    department: "Engineering",
    email: "raman@example.com",
    phone: "9999999999"
  },
  {
    id: 2,
    name: "Priya Sharma",
    department: "HR",
    email: "priya@example.com",
    phone: "8888888888"
  },
  {
    id: 3,
    name: "Ansh",
    department: "Finance",
    email: "Ansh@example.com",
    phone: "7777777777"
  },
  {
    id: 4,
    name: "Mayank",
    department: "Marketing",
    email: "mayank@example.com",
    phone: "6666666666"
  },
  {
    id: 5,
    name: "Rahul Verma",
    department: "Engineering",
    email: "rahul@example.com",
    phone: "5555555555"
  }
];

export const setEmployees = (newEmployees) => {
  employees = newEmployees;
};
