import { projects, setProjects } from '../data/projects.js';

export const getAllProjects = (req, res) => {
  res.json(projects);
};

export const getProjectById = (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json(project);
};

export const createProject = (req, res) => {
  const { title, client, status, budget } = req.body;

  const newProject = {
    id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
    title,
    client,
    status,
    budget
  };

  projects.push(newProject);
  res.status(201).json(newProject);
};

export const updateProject = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, client, status, budget } = req.body;

  const index = projects.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects[index] = { id, title, client, status, budget };
  res.json(projects[index]);
};

export const deleteProject = (req, res) => {
  const id = parseInt(req.params.id);
  const index = projects.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects.splice(index, 1);
  res.json({ message: 'Project deleted successfully' });
};
