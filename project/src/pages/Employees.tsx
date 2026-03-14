import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  Employee
} from '../services/employeeService';

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    phone: ""
  });
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      setRole(parsed.role);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setTimeout(() => {
        setEmployees(data);
        setLoading(false);
      }, 600); // smooth skeleton transition
    } catch (error) {
      console.error("Error loading employees:", error);
      setLoading(false);
    }
  };

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        name: employee.name,
        department: employee.department,
        email: employee.email,
        phone: employee.phone
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        name: "",
        department: "",
        email: "",
        phone: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData({
      name: "",
      department: "",
      email: "",
      phone: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
      } else {
        await createEmployee(formData);
      }
      loadEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        loadEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Department", accessor: "department" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" }
  ];

  return (
    <div className="animate-page-fade">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Employees
        </h1>

        {role !== "user" && (
          <Button
            onClick={() => handleOpenModal()}
            className="hover:scale-105 transition-all"
          >
            <Plus size={20} className="inline mr-2" />
            Add Employee
          </Button>
        )}
      </div>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-14 w-full bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          data={employees}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          role={role}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-fast">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingEmployee ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
