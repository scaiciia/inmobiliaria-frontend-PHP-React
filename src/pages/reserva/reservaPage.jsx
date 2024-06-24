import React, { useState } from 'react';
import FooterComponent from "../../components/footerComponent";
import HeaderComponent from "../../components/headerComponent";
import useReservas from '../../hooks/useReservas';
import ReservaItem from '../../components/reserva/reservaItem';
import EditarReserva from './EditarReserva.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/components/reserva/reservaList.css'; // Importa el nuevo archivo CSS

function ReservaPage() {
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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <HeaderComponent />
      <div>
        <h1>Reservas</h1>
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
      <FooterComponent />
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

