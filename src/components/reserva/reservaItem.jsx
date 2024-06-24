import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import '../../assets/styles/components/reserva/reserva.css';

function ReservaItem(props) {
  const handleEdit = () => {
    props.abrirModalEdicion(props.reserva);
  };

  const handleDelete = () => {
    props.eliminarDetalle(props.reserva.id);
  };

  return (
    <div className='ReservaItem'>
      <div className="info">
        <span><strong>Domicilio:</strong> {props.reserva.propiedad_id.domicilio}</span>
        <span><strong>Apellido del Inquilino:</strong> {props.reserva.inquilino_id.apellido}</span>
        <span><strong>Nombre del Inquilino:</strong> {props.reserva.inquilino_id.nombre}</span>
        <span><strong>Fecha Desde:</strong> {props.reserva.fecha_desde}</span>
        <span><strong>Cantidad de Noches:</strong> {props.reserva.cantidad_noches}</span>
        <span><strong>Valor Total:</strong> ${props.reserva.valor_total}</span>
      </div>
      <div className='iconDiv'>
        <FontAwesomeIcon className='icono' icon={faPenToSquare} size='xl' onClick={handleEdit} />
        <FontAwesomeIcon className='icono' icon={faTrashCan} size='xl' onClick={handleDelete} />
      </div>
    </div>
  );
}

export default ReservaItem;
