import '../../assets/styles/pages/propiedad/detailPropiedad.css'

function DetailPropiedad({item}) {
    return ( 
        <div className="DetailProp">
            <div className='DetailPropImg'>
                <img src={item.imagen} alt="Sin Imagen"/>
            </div>
            <div className='separador'></div>
            <div className="Info">
                <h1>{item.domicilio}</h1>
                <span><strong>Localidad:  </strong> {item.localidad_id.nombre}</span>
                <span><strong>Tipo:  </strong> {item.tipo_propiedad_id.nombre}</span>
                <span><strong>Cantidad de habitaciones:  </strong> {item.cantidad_habitaciones}</span>
                <span><strong>Cantidad de Huespedes:  </strong> {item.cantidad_huespedes}</span>
                <span><strong>Cantidad de baños:  </strong> {item.cantidad_banios}</span>
                <span><strong>Cochera:  </strong> {item.cochera}</span>
                <span><strong>Precio por noche:  </strong>${item.valor_noche}</span>
                <span><strong>Disponible:  </strong> {item.disponible? "Si" : "No"}</span>
                <span className={`fechaInicio ${item.disponible? "" : "mostrar"}`}><strong>Fecha disponible:  </strong> {item.fecha_inicio_disponibilidad}</span>
            </div>
        </div>
     );
}

export default DetailPropiedad;