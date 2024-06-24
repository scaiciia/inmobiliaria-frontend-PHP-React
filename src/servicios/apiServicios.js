import axios from 'axios';

const API_BASE_URL = 'http://localhost:80';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const apiService = {
  getReservas: async () => {
    try {
      const response = await apiClient.get('/reservas');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching reservas:', error);
      throw error;
    }
  },
};

export default apiService;