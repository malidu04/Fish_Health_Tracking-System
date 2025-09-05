import api from './api';

export const fishService = {
    getAll: async () => {
        const response = await api.get('/fish');
        return response.data;
    },
    getById: async (id) => {
    const response = await api.get(`/fish/${id}`);
    return response.data;
  },

  create: async (fishData) => {
    const response = await api.post('/fish', fishData);
    return response.data;
  },

  update: async (id, fishData) => {
    const response = await api.put(`/fish/${id}`, fishData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/fish/${id}`);
    return response.data;
  },

  getHealthHistory: async (id) => {
    const response = await api.get(`/fish/${id}/health`);
    return response.data;
  }
}