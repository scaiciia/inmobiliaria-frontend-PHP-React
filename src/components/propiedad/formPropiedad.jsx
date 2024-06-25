import { useEffect, useState } from "react";
import { EsNumero, esVacio, esStringValido, validarFecha } from "../../utils/validaciones";
import apiService from '../../servicios/apiServicios';
import '../../assets/styles/components/propiedad/formPropiedad.css'

function FormPropiedad(props) {

    const [localidades, setLocalidades] = useState([]);
    const [tipoPropiedades, setTipoPropiedades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tipoPropiedadesData, localidadesData] = await Promise.all([
                    apiService.getTiposPropiedad(),
                    apiService.getLocalidades()
                ]);

                setTipoPropiedades(tipoPropiedadesData);
                setLocalidades(localidadesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setMessage('');
        const { name, value, type, checked, required } = e.target;
        try {
            if (type === 'number') {
                if (!EsNumero(value)) {
                    throw new Error('Debe ingresar un número');
                }
            } else if (type === 'text') {
                if (!esStringValido(value)) {
                    throw new Error('No estan permitidos caracteres especiales');
                }
            } else if (type === 'date') {
                if (!validarFecha(value)) {
                    return window.alert('Fecha invalida');
                }
            }
            if (required) {
                if (esVacio(value)) {
                    throw new Error('Hay campo obligatorio sin completar');
                }
            }
            props.setItem({
                ...props.item,
                [name]: type === 'checkbox' ? checked : value,
            });
        } catch (Error) {
            setMessage(Error);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                const [metadata, base64Data] = base64String.split(',');
                console.log(metadata);
                props.setItem({
                ...props.item,
                imagen: base64Data,
                tipo_imagen: metadata,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (message) {
            window.alert(message);
            setMessage('');
        }
    }, [message]);


    return ( 
        <div className="formPropiedad">
            {loading && <p>Cargando...</p>}
            <form >
                <div className="imagen">
                    <img src={`${props.item.tipo_imagen},${props.item.imagen}`} alt="Sin Imagen" htmlFor="imagen" />
                    <input type="file" name="imagen" id="imagen" onChange={handleFileChange}/>
                </div>
                <div className='separador'></div>
                <div className="info">
                    <div>
                        <label htmlFor="domicilio">Domicilio: </label>
                        <input type="text" name="domicilio" id="domicilio" value={props.item.domicilio} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="localidad_id">Localidad: </label>
                        <select name="localidad_id" id="localidad_id" value={props.item.localidad_id ? props.item.localidad_id : ''} onChange={handleChange} required>
                            <option value="">---</option>
                            {localidades.map(localidad_id => (
                                <option key={localidad_id.id} value={localidad_id.id}>
                                    {localidad_id.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="tipo_propiedad_id">Tipo de Propiedad: </label>
                        <select name="tipo_propiedad_id" id="tipo_propiedad_id" value={props.item.tipo_propiedad_id ? props.item.tipo_propiedad_id : ''} onChange={handleChange} required >
                            <option value="">---</option>
                            {tipoPropiedades.map(tipo_propiedad_id => (
                                <option key={tipo_propiedad_id.id} value={tipo_propiedad_id.id}>
                                    {tipo_propiedad_id.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cantidad_habitaciones">Cantidad de Habitaciones: </label>
                        <input type="number" name="cantidad_habitaciones" id="cantidad_habitaciones" value={props.item.cantidad_habitaciones} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="cantidad_huespedes">Cantidad de Huespedes: </label>
                        <input type="number" name="cantidad_huespedes" id="cantidad_huespedes" value={props.item.cantidad_huespedes} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="cantidad_banios">Cantidad de Baños: </label>
                        <input type="number" name="cantidad_banios" id="cantidad_banios" value={props.item.cantidad_banios} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="cochera">Cochera: </label>
                        <input type="checkbox" name="cochera" id="cochera" value={props.item.cochera} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="valor_noche">Valor por noche: </label>
                        <input type="number" name="valor_noche" id="valor_noche" value={props.item.valor_noche} onChange={handleChange} requiered />
                    </div>
                    <div>
                        <label htmlFor="cantidad_dias">Cantidad de días: </label>
                        <input type="number" name="cantidad_dias" id="cantidad_dias" value={props.item.cantidad_dias} onChange={handleChange} requiered />
                    </div>
                    <div>
                        <label htmlFor="disponible">Disponible: </label>
                        <input type="checkbox" name="disponible" id="disponible" value={props.item.disponible} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="fecha_inicio_disponibilidad">Fecha inicio Disponiblididad: </label>
                        <input type="date" name="fecha_inicio_disponibilidad" id="fecha_inicio_disponibilidad" value={props.item.fecha_inicio_disponibilidad} onChange={handleChange} required/>
                    </div>
                    <div className="botones">
                        <input type="button" value="Cancelar" onClick={props.onClose} />
                        <input type="button" value="Guardar Cambios" onClick={props.handleGuardar}/>
                    </div>
                </div>
            </form>
        </div>
     );
}

export default FormPropiedad;