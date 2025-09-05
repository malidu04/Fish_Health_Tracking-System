// File: frontend/src/services/health.js
import api from './api';

export const healthService = {
  getAll: async (params = {}) => {
    const response = await api.get('/health', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/health/${id}`);
    return response.data;
  },

  create: async (healthData) => {
    const response = await api.post('/health', healthData);
    return response.data;
  },

  update: async (id, healthData) => {
    const response = await api.put(`/health/${id}`, healthData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/health/${id}`);
    return response.data;
  }
};