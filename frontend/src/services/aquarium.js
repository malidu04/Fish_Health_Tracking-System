// File: frontend/src/services/aquarium.js
import api from './api';

export const aquariumService = {
  getAll: async () => {
    const response = await api.get('/aquariums'); // You'll need to create this backend endpoint
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/aquariums/${id}`);
    return response.data;
  },

  create: async (aquariumData) => {
    const response = await api.post('/aquariums', aquariumData);
    return response.data;
  },

  update: async (id, aquariumData) => {
    const response = await api.put(`/aquariums/${id}`, aquariumData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/aquariums/${id}`);
    return response.data;
  }
};