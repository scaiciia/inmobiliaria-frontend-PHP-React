import '../../assets/styles/pages/propiedadItem.css'

function PropiedadItem({item}) {
    return ( 
        <div className='PropiedadItem'>
            <img src={item.imagen} alt="Sin Imagen"/>
            <div>
                <h3>{item.domicilio}</h3>
                <span><strong>Localidad:  </strong> {item.localidad_id.nombre}</span>
                <span><strong>Tipo:  </strong> {item.tipo_propiedad_id.nombre}</span>
                <span><strong>Fecha disponible:  </strong> {item.fecha_inicio_disponibilidad}</span>
                <span><strong>Cantidad de Huespedes:  </strong> {item.cantidad_huespedes}</span>
                <span><strong>Precio por noche:  </strong>${item.valor_noche}</span>
            </div>
        </div>
     );
}

export default PropiedadItem;