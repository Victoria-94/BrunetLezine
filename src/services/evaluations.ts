import api from './api';
import { Evaluation } from '../types';

export const evaluationsService = {
  getAll: async () => {
    const { data } = await api.get<Evaluation[]>('/evaluations');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Evaluation>(`/evaluations/${id}`);
    return data;
  },

  getByChild: async (childId: string) => {
    const { data } = await api.get<Evaluation[]>(`/evaluations/child/${childId}`);
    return data;
  },

  create: async (evaluation: Omit<Evaluation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await api.post<Evaluation>('/evaluations', evaluation);
    return data;
  },

  update: async (id: string, evaluation: Partial<Evaluation>) => {
    const { data } = await api.put<Evaluation>(`/evaluations/${id}`, evaluation);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/evaluations/${id}`);
  }
};