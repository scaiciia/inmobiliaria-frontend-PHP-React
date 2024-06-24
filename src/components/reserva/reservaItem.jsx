
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
function ReservaItem (props) {

    // crear hook que llame a estas funciones
    
    const handleDetalle = () => {
        props.mostrarDetalle(props.reserva.id);
    }

    const handleEdit = () => {
        props.editarProp(props.reserva.id);
    }

    const handleDelete = () => {
        props.eliminarProp(props.reserva.id);
    }
    return (
        <>
            <div style={{display : "block"}}>
                {props.reserva.propiedad_id.domicilio}
                {props.reserva.inquilino_id.apellido}
                {props.reserva.inquilino_id.nombre}
                {props.reserva.fecha_desde}
                {props.reserva.cantidad_noches}
                {props.reserva.valor_total}
            </div>
            <div className='iconDiv'>
                <FontAwesomeIcon className='icono' icon={faEye} size='xl' onClick={handleDetalle}/>
                <FontAwesomeIcon className='icono' icon={faPenToSquare} size='xl' onClick={handleEdit} />
                <FontAwesomeIcon className='icono' icon={faTrashCan} size='xl' onClick={handleDelete} />
            </div>
        </>
    )
}

export default ReservaItem ;