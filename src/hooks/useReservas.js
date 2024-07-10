import { useState, useEffect } from 'react';
import apiService from '../servicios/apiServicios';
import { toast } from 'react-toastify';

const useReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservasData, propiedadesData, inquilinosData] = await Promise.all([
          apiService.getReservas(),
          apiService.getPropiedades(),
          apiService.getInquilinos()
        ]);

        setReservas(reservasData);
        setPropiedades(propiedadesData);
        setInquilinos(inquilinosData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editarReserva = async (id, values, onSave) => {
    console.log('entro')
    try {
      const response = await apiService.editarReserva(id, values);
      console.log('response',response)
      if (response.status === 'success') {
        toast.success(response.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      } else {
        toast.error(response.error || 'Error actualizando la reserva');
      }
      onSave();
    } catch (error) {
      toast.error('Error actualizando la reserva');
    }
  };

  const eliminarReserva = async (id) => {
    try {
      const response = await apiService.deleteReserva(id);
      console.log('response',response)
      if (response.status === 'success') {
        setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
      }
      else {
        toast.error(response.error);
      }
      toast.success(response.message) ;
    } catch (error) {
      toast.error('Error eliminando la reserva');
      throw error;
    }
  };

  return {
    reservas,
    propiedades,
    inquilinos,
    loading,
    editarReserva,
    eliminarReserva,
    setReservas 
  };
};

export default useReservas;
