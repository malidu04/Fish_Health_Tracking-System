// File: frontend/src/services/treatment.js
import api from './api';

export const treatmentService = {
  getAll: async (params = {}) => {
    const response = await api.get('/treatments', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/treatments/${id}`);
    return response.data;
  },

  create: async (treatmentData) => {
    const response = await api.post('/treatments', treatmentData);
    return response.data;
  },

  update: async (id, treatmentData) => {
    const response = await api.put(`/treatments/${id}`, treatmentData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/treatments/${id}`);
    return response.data;
  }
};