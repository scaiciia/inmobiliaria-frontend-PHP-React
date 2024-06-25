import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../servicios/apiServicios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TipoPropiedadItem from '../../components/tipoPropiedad/tipoPropiedadItem';
import './tipoPropiedadPage.css';

function TipoPropiedadPage() {
  const navigate = useNavigate();
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

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Está seguro de que desea eliminar este tipo de propiedad?");
    if (confirmar) {
      try {
        await apiService.deleteTipoPropiedad(id);
        setTiposPropiedad(tiposPropiedad.filter(tipo => tipo.id !== id));
        toast.success('Tipo de propiedad eliminado con éxito');
      } catch (error) {
        toast.error('No se pudo eliminar el tipo de propiedad');
      }
    }
  };

  const handleEdit = (tipoPropiedad) => {
    navigate(`/tipo-propiedades/editar/${tipoPropiedad.id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="tipo-propiedad-container">
      <h1>Tipos de Propiedad</h1>
      <button onClick={() => navigate('/tipo-propiedades/nueva')} className="new-tipo-propiedad-button">
        Crear Nuevo Tipo de Propiedad
      </button>
      <ul className="tipo-propiedad-list">
        {tiposPropiedad.map(tipo => (
          <li key={tipo.id} className="tipo-propiedad-item">
            <TipoPropiedadItem
              tipoPropiedad={tipo}
              editarTipoPropiedad={handleEdit}
              eliminarTipoPropiedad={handleDelete}
            />
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default TipoPropiedadPage;
