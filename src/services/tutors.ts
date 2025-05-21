import api from './api';
import { Tutor } from '../types';

export const tutorsService = {
  getAll: async () => {
    const { data } = await api.get<Tutor[]>('/tutors');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Tutor>(`/tutors/${id}`);
    return data;
  },

  create: async (tutor: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await api.post<Tutor>('/tutors', tutor);
    return data;
  },

  update: async (id: string, tutor: Partial<Tutor>) => {
    const { data } = await api.put<Tutor>(`/tutors/${id}`, tutor);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/tutors/${id}`);
  }
};