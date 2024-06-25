import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import './tipoPropiedadItem.css';

function TipoPropiedadItem({ tipoPropiedad, editarTipoPropiedad, eliminarTipoPropiedad }) {

  const handleEdit = () => {
    editarTipoPropiedad(tipoPropiedad);
  };

  const handleDelete = () => {
    eliminarTipoPropiedad(tipoPropiedad.id);
  };

  return (
    <div className="TipoPropiedadItem">
      <div className="info">
        <span><strong>Nombre:</strong> {tipoPropiedad.nombre}</span>
      </div>
      <div className="iconDiv">
        <FontAwesomeIcon className="icono" icon={faPenToSquare} size="xl" onClick={handleEdit} />
        <FontAwesomeIcon className="icono" icon={faTrashCan} size="xl" onClick={handleDelete} />
      </div>
    </div>
  );
}

export default TipoPropiedadItem;

