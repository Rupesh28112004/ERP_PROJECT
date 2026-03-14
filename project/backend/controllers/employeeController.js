import { employees, setEmployees } from '../data/employees.js';

export const getAllEmployees = (req, res) => {
  res.json(employees);
};

export const getEmployeeById = (req, res) => {
  const employee = employees.find(e => e.id === parseInt(req.params.id));

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res.json(employee);
};

export const createEmployee = (req, res) => {
  const { name, department, email, phone } = req.body;

  const newEmployee = {
    id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
    name,
    department,
    email,
    phone
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
};

export const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, department, email, phone } = req.body;

  const index = employees.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees[index] = { id, name, department, email, phone };
  res.json(employees[index]);
};

export const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees.splice(index, 1);
  res.json({ message: 'Employee deleted successfully' });
};
