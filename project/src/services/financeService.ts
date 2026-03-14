import { apiRequest } from './api';

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  description: string;
  date: string;
}

export const getAllTransactions = async (): Promise<Transaction[]> => {
  return apiRequest('/finance');
};

export const createTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  return apiRequest('/finance', {
    method: 'POST',
    body: JSON.stringify(transaction)
  });
};
