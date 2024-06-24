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
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching reservas:', error);
      throw error;
    }
  },

  deleteReserva: async (id) => {
    try {
      const response = await apiClient.delete(`/reservas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting reserva:', error);
      throw error;
    }
  },

  editarReserva: async (id, updatedData) => {
    try {
      const response = await apiClient.put(`/reservas/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating reserva:', error);
      throw error;
    }
  },

  createReserva: async (data) => {
    try {
      const response = await apiClient.post('/reservas', data);
      return response.data;
    } catch (error) {
      console.error('Error creating reserva:', error);
      throw error;
    }
  },

  getPropiedades: async () => {
    try {
      const response = await apiClient.get('/propiedades');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching propiedades:', error);
      throw error;
    }
  },

  getInquilinos: async () => {
    try {
      const response = await apiClient.get('/inquilinos');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching inquilinos:', error);
      throw error;
    }
  }
};

export default apiService;