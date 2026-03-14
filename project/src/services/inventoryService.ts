import { apiRequest } from './api';

export interface InventoryItem {
  id: number;
  itemName: string;
  quantity: number;
  category: string;
  unitPrice: number;
}

export const getAllInventory = async (): Promise<InventoryItem[]> => {
  return apiRequest('/inventory');
};

export const createInventoryItem = async (item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
  return apiRequest('/inventory', {
    method: 'POST',
    body: JSON.stringify(item)
  });
};

export const updateInventoryItem = async (id: number, item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
  return apiRequest(`/inventory/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item)
  });
};

export const deleteInventoryItem = async (id: number): Promise<void> => {
  return apiRequest(`/inventory/${id}`, {
    method: 'DELETE'
  });
};
