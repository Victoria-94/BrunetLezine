import api from './api';
import { Child } from '../types';

export const childrenService = {
  getAll: async () => {
    const { data } = await api.get<Child[]>('/children');
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<Child>(`/children/${id}`);
    return data;
  },

  create: async (child: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await api.post<Child>('/children', child);
    return data;
  },

  update: async (id: string, child: Partial<Child>) => {
    const { data } = await api.put<Child>(`/children/${id}`, child);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/children/${id}`);
  }
};