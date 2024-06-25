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

  deletePropiedad: async (id) => {
    try {
      const response = await apiClient.delete(`/propiedades/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting propiedad:', error);
      throw error;
    }
  },

    editarPropiedad: async (id, updatedData) => {
    try {
      const response = await apiClient.put(`/propiedades/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating propiedad:', error);
      throw error;
    }
  },

  createPropiedad: async (data) => {
    try {
      const response = await apiClient.post('/propiedades', data);
      return response.data;
    } catch (error) {
      console.error('Error creating propiedad:', error);
      throw error;
    }
  },

  getLocalidades: async () => {
    try {
      const response = await apiClient.get('/localidades');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching localidades:', error);
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
  },

  getTiposPropiedad: async () => {
    try {
      const response = await apiClient.get('/tipos_propiedad');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tipos de propiedad:', error);
      throw error;
    }
  },

  createTipoPropiedad: async (data) => {
    try {
      const response = await apiClient.post('/tipos_propiedad', data);
      return response.data;
    } catch (error) {
      console.error('Error creating tipo de propiedad:', error);
      throw error;
    }
  },

  updateTipoPropiedad: async (id, data) => {
    try {
      const response = await apiClient.put(`/tipos_propiedad/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating tipo de propiedad:', error);
      throw error;
    }
  },

  deleteTipoPropiedad: async (id) => {
    try {
      const response = await apiClient.delete(`/tipos_propiedad/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tipo de propiedad:', error);
      throw error;
    }
  }
};

export default apiService;