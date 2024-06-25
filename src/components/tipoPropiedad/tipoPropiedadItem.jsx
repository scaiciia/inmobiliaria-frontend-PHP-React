import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import './tipoPropiedadItem.css';

const TipoPropiedadItem = ({ tipoPropiedad, editarTipoPropiedad, eliminarTipoPropiedad }) => {
    return (
      <div className='tipo-propiedad-item'>
        <div className="info">
          <span>Nombre: {tipoPropiedad.nombre}</span>
        </div>
        <div className='iconDiv'>
          <FontAwesomeIcon className='icono' icon={faPenToSquare} size='l' onClick={() => editarTipoPropiedad(tipoPropiedad)} />
          <FontAwesomeIcon className='icono' icon={faTrashCan} size='l' onClick={() => eliminarTipoPropiedad(tipoPropiedad.id)} />
        </div>
      </div>
    );
  };

export default TipoPropiedadItem;
