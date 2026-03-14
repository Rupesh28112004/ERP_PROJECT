import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  Project
} from '../services/projectService';

export default function Projects() {
  const [role, setRole] = useState<string>("");
  
    useEffect(() => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed = JSON.parse(userStr);
        setRole(parsed.role); // store role directly
      }
    }, []);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    status: '',
    budget: 0
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        client: project.client,
        status: project.status,
        budget: project.budget
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        client: '',
        status: '',
        budget: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      client: '',
      status: '',
      budget: 0
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
      if (editingProject) {
        await updateProject(editingProject.id, formData);
      } else {
        await createProject(formData);
      }
      loadProjects();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Client', accessor: 'client' },
    { header: 'Status', accessor: 'status' },
    { header: 'Budget (₹)', accessor: 'budget' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        {role != 'user'  && <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="inline mr-2" />
          Add Project
        </Button>}
        
      </div>

      <Table 
        columns={columns}
        data={projects}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        role={role}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProject ? 'Edit Project' : 'Add Project'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
          />
          <Input
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="e.g. In Progress, Completed, Planning"
            required
          />
          <Input
            label="Budget (₹)"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-3">

            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingProject ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
