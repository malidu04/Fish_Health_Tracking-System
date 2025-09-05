// File: frontend/src/services/alert.js
import api from './api';

export const alertService = {
  getAll: async (params = {}) => {
    const response = await api.get('/alerts', { params });
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/alerts/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put('/alerts/read-all');
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/alerts/${id}`);
    return response.data;
  }
};