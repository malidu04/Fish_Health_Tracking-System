import api from './api';

export const analyticsService = {
  getHealthTrends: async (params = {}) => {
    const response = await api.get('/analytics/health-trends', { params });
    return response.data;
  },

  getTreatmentAnalytics: async () => {
    const response = await api.get('/analytics/treatment-effectiveness');
    return response.data;
  },

  getSymptomAnalytics: async (params = {}) => {
    const response = await api.get('/analytics/symptoms', { params });
    return response.data;
  },

  getAquariumHealthSummary: async () => {
    const response = await api.get('/analytics/aquarium-summary');
    return response.data;
  }
};