import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTipoPropiedad from '../../hooks/useTipoPropiedades';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TipoPropiedadItem from '../../components/tipoPropiedad/tipoPropiedadItem';
import './tipoPropiedadPage.css';

function TipoPropiedadPage() {
  const navigate = useNavigate();
  const { tiposPropiedad, loading, eliminarTipoPropiedad } = useTipoPropiedad();

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
              eliminarTipoPropiedad={eliminarTipoPropiedad}
            />
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default TipoPropiedadPage;
