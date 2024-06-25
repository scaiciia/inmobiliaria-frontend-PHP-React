import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import '../../assets/styles/components/propiedad/propiedadItem.css'

function PropiedadItem(props) {

    const handleDetalle = () => {
        props.mostrarDetalle(props.item.id);
    }

    const handleEdit = () => {
        props.editarProp(props.item.id);
    }

    const handleDelete = () => {
        props.eliminarProp(props.item.id);
    }

    return ( 
        <div className='PropiedadItem'>
            <img src={`${props.item.tipo_imagen},${props.item.imagen}`} alt="Sin Imagen"/>
            <div>
                <h3>{props.item.domicilio}</h3>
                <span><strong>Localidad:  </strong> {props.item.localidad_id.nombre}</span>
                <span><strong>Tipo:  </strong> {props.item.tipo_propiedad_id.nombre}</span>
                <span><strong>Fecha disponible:  </strong> {props.item.fecha_inicio_disponibilidad}</span>
                <span><strong>Cantidad de Huespedes:  </strong> {props.item.cantidad_huespedes}</span>
                <span><strong>Precio por noche:  </strong>${props.item.valor_noche}</span>
            </div>
            <div className='iconDiv'>
                <FontAwesomeIcon className='icono' icon={faEye} size='xl' onClick={handleDetalle}/>
                <FontAwesomeIcon className='icono' icon={faPenToSquare} size='xl' onClick={handleEdit} />
                <FontAwesomeIcon className='icono' icon={faTrashCan} size='xl' onClick={handleDelete} />
            </div>
        </div>
     );
}

export default PropiedadItem;