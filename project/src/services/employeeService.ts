import { apiRequest } from './api';

export interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
}

export const getAllEmployees = async (): Promise<Employee[]> => {
  return apiRequest('/employees');
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  return apiRequest('/employees', {
    method: 'POST',
    body: JSON.stringify(employee)
  });
};

export const updateEmployee = async (id: number, employee: Omit<Employee, 'id'>): Promise<Employee> => {
  return apiRequest(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(employee)
  });
};

export const deleteEmployee = async (id: number): Promise<void> => {
  return apiRequest(`/employees/${id}`, {
    method: 'DELETE'
  });
};
