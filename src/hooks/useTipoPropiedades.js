import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../servicios/apiServicios';

const useTipoPropiedad = () => {
  const [tiposPropiedad, setTiposPropiedad] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getTiposPropiedad();
        setTiposPropiedad(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tipos de propiedad:', error);
        toast.error('Error fetching tipos de propiedad');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const eliminarTipoPropiedad = async (id) => {
    const confirmar = window.confirm("¿Está seguro de que desea eliminar este tipo de propiedad?");
    if (confirmar) {
      try {
        const response = await apiService.deleteTipoPropiedad(id);
        if (response.code === 400){
          toast.error(response.error)
        } else {
          setTiposPropiedad(tiposPropiedad.filter(tipo => tipo.id !== id));
          toast.success(response.message);
        }
      } catch (error) {
        toast.error('No se pudo eliminar el tipo de propiedad');
      }
    }
  };

  return {
    tiposPropiedad,
    loading,
    eliminarTipoPropiedad,
    setTiposPropiedad 
  };
};

export default useTipoPropiedad;
