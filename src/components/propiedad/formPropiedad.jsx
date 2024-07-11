import { useEffect, useRef, useState } from "react";
import { EsNumero, esStringValido, validarFecha } from "../../utils/validaciones";
import apiService from '../../servicios/apiServicios';
import '../../assets/styles/components/propiedad/formPropiedad.css'

function FormPropiedad(props) {

    const formRef = useRef(null);

    const [localidades, setLocalidades] = useState([]);
    const [tipoPropiedades, setTipoPropiedades] = useState([]);
    const [loading, setLoading] = useState(true);
    

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
                window.alert('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const validarCampos = (name, value, type, required) => {
        let message = {...props.errorV};
        if (value) {
            if (type === 'number') {
                if (!EsNumero(value)) {
                    message = {...message, [name] : 'Debe ingresar un número'};
                } else {
                    delete message[name];
                }
            } else if (type === 'text') {
                if (!(esStringValido(value))) {
                    message = {...message, [name] : 'No estan permitidos caracteres especiales'};
                } else {
                    delete message[name];
                }
                
            } else if (type === 'date') {
                if (!validarFecha(value)) {
                    message = {...message, [name] : 'Fecha invalida'};
                } else {
                    delete message[name];
                }
            }
        } else if (required) {
            message = {...message, [name] : 'Campo oligatorio'};
        }
        return message;
    }

    const handleChange = (e) => {
        const { name, value, type, checked, required } = e.target;
        props.setErrorV(validarCampos(name, value, type, required));
        props.setItem({
            ...props.item,
            [name]: type === 'checkbox' ? checked : (value < 0 ? 0 : value),
        });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                const parts = base64.match(/^data:image\/([a-z0-9]+);base64,(.+)$/);
                props.setItem({
                ...props.item,
                imagen: parts[2],
                tipo_imagen: parts[1],
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGuardar = () => {
        const formData = formRef.current;
        let newErrors = {...props.errorV};
        for (let element of formData.elements) {
            if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                const { name, value, required, type } = element;

                if (name !== 'imagen') {
                    let error = validarCampos(name, value, type, required);
                    newErrors = {...newErrors, ...error};
                }
            }
        }
        props.setErrorV(newErrors);
        if (Object.keys(newErrors).length === 0) {
            props.handleGuardar();
        } else {
            window.alert('Hay errores en los datos ingresados');
        }
    }


    return ( 
        <div className="formPropiedad">
            {loading && <p>Cargando...</p>}
            <form ref={formRef} >
                <div className="imagen">
                    <img src={`data:image/${props.item.tipo_imagen};base64,${props.item.imagen}`} alt="Sin Imagen" htmlFor="imagen" />
                    <input type="file" name="imagen" id="imagen" onChange={handleFileChange}/>
                </div>
                <div className='separador'></div>
                <div className="info">
                    <div>
                        <label htmlFor="domicilio">Domicilio: </label>
                        <input type="text" name="domicilio" id="domicilio" value={props.item.domicilio} onChange={handleChange} required />
                        {props.errorV["domicilio"] && <label className="LabelError">{props.errorV["domicilio"]}</label>}
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
                        {props.errorV["localidad_id"] && <label className="LabelError">{props.errorV["localidad_id"]}</label>}
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
                        {props.errorV["tipo_propiedad_id"] && <label className="LabelError">{props.errorV["tipo_propiedad_id"]}</label>}
                    </div>
                    <div>
                        <label htmlFor="cantidad_habitaciones">Cantidad de Habitaciones: </label>
                        <input type="number" name="cantidad_habitaciones" id="cantidad_habitaciones" value={props.item.cantidad_habitaciones} min="0" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="cantidad_huespedes">Cantidad de Huespedes: </label>
                        <input type="number" name="cantidad_huespedes" id="cantidad_huespedes" value={props.item.cantidad_huespedes} min="0" onChange={handleChange} required />
                        {props.errorV["cantidad_huespedes"] && <label className="LabelError">{props.errorV["cantidad_huespedes"]}</label>}
                    </div>
                    <div>
                        <label htmlFor="cantidad_banios">Cantidad de Baños: </label>
                        <input type="number" name="cantidad_banios" id="cantidad_banios" value={props.item.cantidad_banios} min="0" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="cochera">Cochera: </label>
                        <input type="checkbox" name="cochera" id="cochera" checked={props.item.cochera ? props.item.cochera : 0} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="valor_noche">Valor por noche: </label>
                        <input type="number" name="valor_noche" id="valor_noche" value={props.item.valor_noche} min="0" onChange={handleChange} required />
                        {props.errorV["valor_noche"] && <label className="LabelError">{props.errorV["valor_noche"]}</label>}
                    </div>
                    <div>
                        <label htmlFor="cantidad_dias">Cantidad de días: </label>
                        <input type="number" name="cantidad_dias" id="cantidad_dias" value={props.item.cantidad_dias} min="0" onChange={handleChange} required />
                        {props.errorV["cantidad_dias"] && <label className="LabelError">{props.errorV["cantidad_dias"]}</label>}
                    </div>
                    <div>
                        <label htmlFor="disponible">Disponible: </label>
                        <input type="checkbox" name="disponible" id="disponible" checked={props.item.disponible} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="fecha_inicio_disponibilidad">Fecha inicio Disponiblididad: </label>
                        <input type="date" name="fecha_inicio_disponibilidad" id="fecha_inicio_disponibilidad" value={props.item.fecha_inicio_disponibilidad || ''} onChange={handleChange} required/>
                        {props.errorV["fecha_inicio_disponibilidad"] && <label className="LabelError">{props.errorV["fecha_inicio_disponibilidad"]}</label>}
                    </div>
                    <div className="botones">
                        <input type="button" value="Cancelar" onClick={props.onClose} />
                        <input type="button" value="Guardar Cambios" onClick={handleGuardar}/>
                    </div>
                </div>
            </form>
        </div>
     );
}

export default FormPropiedad;