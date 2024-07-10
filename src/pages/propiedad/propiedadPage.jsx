import { useEffect, useState } from "react";
import apiService from '../../servicios/apiServicios';
import FooterComponent from "../../components/footerComponent";
import HeaderComponent from "../../components/headerComponent";
import PropiedadItem from "../../components/propiedad/propiedadItem";
import '../../assets/styles/pages/propiedad/propiedadPage.css';
import DetailPropiedad from "./detailPropiedad";
import ModalsComponent from "../../components/modalsComponent";
import FormPropiedad from "../../components/propiedad/formPropiedad";

const initialData = {
        id: null,
        domicilio: '',
        localidad_id: '',
        cantidad_habitaciones: '',
        cantidad_banios: '',
        cochera: '',
        cantidad_huespedes: '',
        fecha_inicio_disponibilidad: '',
        cantidad_dias: '',
        disponible: '',
        valor_noche: '',
        tipo_propiedad_id: '',
        imagen: '',
        tipo_imagen: ''
    }

function PropiedadPage() {
    

    const [filtro, setFiltro] = useState({
        disponible: false,
        localidad: '',
        fechaInicio: '',
        huespedes: ''
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [localidades, setLocalidades] = useState([]);
    const [viewShow, setViewShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [propiedad, setPropiedad] = useState(initialData);
    const [actualizar, setActualizar] = useState(false);
    const [propiedadAux, setPropiedadAux] = useState(initialData);
    const [error, setError] = useState();

    const actualizarLista = async () => {
            try {
                const [propiedadesData, localidadesData] = await Promise.all([
                    apiService.getPropiedades(),
                    apiService.getLocalidades()
                ]);

                setData(propiedadesData);
                setLocalidades(localidadesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    

    useEffect(() => {
        actualizarLista();
        setActualizar(false);
    }, [actualizar]);

    useEffect(() => {
        if (data !== ''){
            setLoading(false);
        } else{
            setLoading(true);
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const serchParams = new URLSearchParams();
        serchParams.append("disponible", filtro.disponible);
        if (filtro.fechaInicio !== '') {
            serchParams.append("fecha_inicio_disponibilidad", filtro.fechaInicio);
        }
        if (filtro.localidad !== '') {
            serchParams.append("localidad_id", filtro.localidad);
        }
        if (filtro.huespedes !== '') {
            serchParams.append("cantidad_huespedes", parseInt(filtro.huespedes));
        }
        const datosEnviar = serchParams.toString();
        setLoading(true);
        const url = `http://localhost:80/propiedades?${datosEnviar}`;
        fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo filtrar las propiedades');
            }
            return response.json();
        })
        .then(json => {
            if (json.code === 404) {
                setData([]);
                throw new Error('No hay propiedades');
            } else {
                setData(json.data);
                setError(null);
            }
            setLoading(false);
            
        })
        .catch(error => {
            console.error('Error al filtrar propiedades:' + error.message);
            setError(error);
            setLoading(false);
        });
    }

    const handleLimpiarFiltros = () => {

        setFiltro({
            disponible: false,
            localidad: '',
            fechaInicio: '',
            huespedes: ''
        });
        setActualizar(true);
        setError();
        console.log(data);
    };

    const handleGuardar = async() => {
        const fetchData = async (id = null, datos) => {
            try {
                let response = null;
                if (id == null) {
                    response = await Promise.all([
                        apiService.createPropiedad(datos),
                    ]);
                } else {
                    response = await Promise.all([
                        apiService.editarPropiedad(id, datos),
                    ]);
                }

                console.log(response);
                setEditShow(false);
                setActualizar(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const id = propiedadAux.id;
        const datos = {
            domicilio: propiedadAux.domicilio,
            localidad_id: parseInt(propiedadAux.localidad_id),
            cantidad_habitaciones: parseInt(propiedadAux.cantidad_habitaciones),
            cantidad_banios: parseInt(propiedadAux.cantidad_banios),
            cochera: propiedadAux.cochera,
            cantidad_huespedes: parseInt(propiedadAux.cantidad_huespedes),
            fecha_inicio_disponibilidad: propiedadAux.fecha_inicio_disponibilidad,
            cantidad_dias: parseInt(propiedadAux.cantidad_dias),
            disponible: propiedadAux.disponible,
            valor_noche: parseInt(propiedadAux.valor_noche),
            tipo_propiedad_id: parseInt(propiedadAux.tipo_propiedad_id),
            imagen: propiedadAux.imagen,
            tipo_imagen: propiedadAux.tipo_imagen
        }
        fetchData(id, datos);
    }

    const mostrarDetalle = (id) => {
        const fetchData = async (id) => {
            try {
                const [propiedadData] = await Promise.all([
                    apiService.getPropiedadById(id)
                ]);

                setPropiedad(propiedadData["message"][0]);
                setError(null);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(id);
        setViewShow(true);
    }

    const cerrarVentana = () => {
        setViewShow(false);
        setEditShow(false);
    }

    const handleCrearPropiedad = () => {
        setPropiedadAux({
            id: null,
            domicilio: '',
            localidad_id: '',
            cantidad_habitaciones: '',
            cantidad_banios: '',
            cochera: false,
            cantidad_huespedes: '',
            fecha_inicio_disponibilidad: '',
            cantidad_dias: '',
            disponible: false,
            valor_noche: '',
            tipo_propiedad_id: '',
            imagen: '',
            tipo_imagen: ''
        });
        setEditShow(true);
    }

    const editarProp = (id) => {
        
        setPropiedadAux({
            ...data[id-1],
            localidad_id: data[id-1].localidad_id.id,
            tipo_propiedad_id: data[id-1].tipo_propiedad_id.id
        });
        setEditShow(true);
    }

    const eliminarProp = (id) => {
        const fetchData = async (datos) => {
            try {
                const [response] = await Promise.all([
                    apiService.deletePropiedad(datos)
                ]);
                
                setEditShow(false);
                const rta = response;
                console.log(rta);
                return rta;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        let rta = window.confirm('Esta seguro de eliminar?');
        if (rta) {
            const response = fetchData(id);
            setActualizar(true);
            window.alert(response[0]);
        }

    }

    return ( 
        <div className="main">
            <HeaderComponent></HeaderComponent>
            <main>
                <div className="titulo">
                    <h1>Propiedades</h1>
                    <button onClick={handleCrearPropiedad}>Nueva propiedad</button>
                </div>
                <h3>Filtros</h3>
                <form className="filtrosPropiedades" onSubmit={handleSubmit}>
                    
                    <div className="filtrosPropiedadesItem">
                        <label htmlFor="disponible">Disponible: </label>
                        <input type="checkbox" name="disponible" id="disponible" checked={filtro.disponible} onChange={(e) => setFiltro({...filtro, disponible: e.target.checked})}/>
                    </div>
                    <div className="filtrosPropiedadesItem">
                        <label htmlFor="localidad">Localidad: </label>
                        <select name="localidad" id="localidad" value={filtro.localidad} onChange={(e) => setFiltro({...filtro, localidad: e.target.value})}>
                            <option value="">---</option>
                            {localidades.map(localidad => (
                                <option key={localidad.id} value={localidad.id}>
                                    {localidad.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filtrosPropiedadesItem">
                        <label htmlFor="fechaInicio">Fecha de inicio: </label>
                        <input type="date" name="fechaInicio" id="fechaInicio" value={filtro.fechaInicio} onChange={(e) => setFiltro({...filtro, fechaInicio: e.target.value})} />
                    </div>
                    <div className="filtrosPropiedadesItem">
                        <label htmlFor="hespedes">Cantidad de huéspedes: </label>
                        <input type="number" name="hespedes" id="hespedes" value={filtro.huespedes} onChange={(e) => setFiltro({...filtro, huespedes: e.target.value})} />
                    </div>
                    <div className="filtrosPropiedadesButtons">
                        <input type="submit" value="Aplicar filtros" />
                        <input type="button" value="Limpiar filtros" onClick={handleLimpiarFiltros} />
                    </div>
                </form>
                <div className="listaPropiedades">
                    {loading ? <p>Cargando...</p> :
                        (error ? <p>{error.message}</p> : 
                        <ul>
                            {data.map(item => (
                                <PropiedadItem className='PropiedadItem' key={item.id} item={item} mostrarDetalle={mostrarDetalle} eliminarProp={eliminarProp} editarProp={editarProp} />
                            ))}
                        </ul>)
                    }
                </div>
                <ModalsComponent show={viewShow} onClose={cerrarVentana} children={<DetailPropiedad item={propiedad} />}></ModalsComponent>
                <ModalsComponent show={editShow} onClose={cerrarVentana} children={<FormPropiedad item={propiedadAux} setItem={setPropiedadAux} handleGuardar={handleGuardar} onClose={cerrarVentana} />}></ModalsComponent>
            </main>
            <FooterComponent></FooterComponent>
        </div>
     );
}

export default PropiedadPage;