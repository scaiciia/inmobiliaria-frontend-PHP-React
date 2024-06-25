import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../../components/headerComponent";
import useReservas from '../../hooks/useReservas';
import ReservaItem from '../../components/reserva/reservaItem';
import EditarReserva from './EditarReserva.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/components/reserva/reservaPage.css';

function ReservaPage() {
  const navigate = useNavigate();
  const { reservas, propiedades, inquilinos, loading, editarReserva, eliminarReserva } = useReservas();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);

  const abrirModalEdicion = (reserva) => {
    setSelectedReserva(reserva);
    setModalOpen(true);
  };

  const cerrarModalEdicion = () => {
    setSelectedReserva(null);
    setModalOpen(false);
  };

  const handleSave = async () => {
    cerrarModalEdicion();
  };

  const confirmarEliminacion = (id) => {
    const confirmar = window.confirm("¿Está seguro de que desea eliminar esta reserva?");
    if (confirmar) {
      eliminarReserva(id)
        .then(() => {
          toast.success('Reserva eliminada con éxito');
        })
        .catch((error) => {
          toast.error('No se pudo eliminar la reserva');
        });
    }
  };

  const handleCrearNuevaReserva = () => {
    navigate('/reservas/nueva');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <HeaderComponent />
      <div className="reserva-list-container">
        <h1>Reservas</h1>
        <button onClick={handleCrearNuevaReserva} className="new-reserva-button">
          Crear Nueva Reserva
        </button>
        <ul className="reserva-list">
          {reservas.map(reserva => (
            <li key={reserva.id} className="reserva-item">
              <ReservaItem
                reserva={reserva}
                abrirModalEdicion={() => abrirModalEdicion(reserva)}
                eliminarDetalle={() => confirmarEliminacion(reserva.id)}
              />
            </li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <EditarReserva
          reserva={selectedReserva}
          propiedades={propiedades}
          inquilinos={inquilinos}
          isOpen={modalOpen}
          onClose={cerrarModalEdicion}
          onSave={handleSave}
          editarReserva={editarReserva}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default ReservaPage;
