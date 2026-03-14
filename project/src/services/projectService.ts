import { apiRequest } from './api';

export interface Project {
  id: number;
  title: string;
  client: string;
  status: string;
  budget: number;
}

export const getAllProjects = async (): Promise<Project[]> => {
  return apiRequest('/projects');
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  return apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(project)
  });
};

export const updateProject = async (id: number, project: Omit<Project, 'id'>): Promise<Project> => {
  return apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project)
  });
};

export const deleteProject = async (id: number): Promise<void> => {
  return apiRequest(`/projects/${id}`, {
    method: 'DELETE'
  });
};
