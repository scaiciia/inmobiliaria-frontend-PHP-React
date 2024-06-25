import { useEffect, useState } from "react";
import FooterComponent from "../../components/footerComponent";
import HeaderComponent from "../../components/headerComponent";
import PropiedadItem from "../../components/propiedad/propiedadItem";
import '../../assets/styles/pages/propiedad/propiedadPage.css';
import DetailPropiedad from "./detailPropiedad";

function PropiedadPage() {
    const [filtro, setFiltro] = useState({
        disponible: false,
        localidad: '',
        fechaInicio: '',
        huespedes: ''
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const  [error, setError] = useState(null);
    const [localidades, setLocalidades] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch('http://localhost:80/propiedades')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No hay respuesta del servidor' + response.statusText);
                }
                return response.json();
            })
            .then(json => {

                if (json.code === 404) {
                    throw new Error('No hay propiedades');
                } else {
                    const updatedData = json.data.map(item => {
                        if (item.imagen && item.tipo_imagen) {
                            item.imagen = item.tipo_imagen + item.imagen.split(",")[1];
                        }
                        return item;
                    });
                    setData(updatedData);
                    setError(null);
                }
                
            })
            .catch(error => {
                setError('Error al cargar propiedades:'+ error);
            });

        fetch('http://localhost:80/localidades')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No hay respuesta del servidor' + response.statusText);
                }
                return response.json();
            })
            .then(json => {
                setLocalidades(json.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error al cargar localidades:', error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

         const datosEnviar = new URLSearchParams({
            disponible: filtro.disponible,
            localidad_id: filtro.localidad,
            fecha_inicio_disponibilidad: filtro.fechaInicio,
            cantidad_huespedes: filtro.huespedes
        }).toString();
        setLoading(true);
        const url = `http://localhost:80/propiedades?${datosEnviar}`;
        // Enviar los datos al servidor
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
                const updatedData = json.data.map(item => {
                    if (item.imagen && item.tipo_imagen) {
                        item.imagen = item.tipo_imagen + item.imagen.split(",")[1];
                    }
                    return item;
                });
                setData(updatedData);
                setError(null);
            }
            setLoading(false);
            
        })
        .catch(error => {
            console.error('Error al filtrar propiedades:' + error);
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

        fetch('http://localhost:80/propiedades')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No hay respuesta del servidor' + response.statusText);
                }
                return response.json();
            })
            .then(json => {

                if (json.code === 404) {
                    setData([]);
                    throw new Error('No hay propiedades');
                } else {
                    const updatedData = json.data.map(item => {
                        if (item.imagen && item.tipo_imagen) {
                            item.imagen = item.tipo_imagen + item.imagen.split(",")[1];
                        }
                        return item;
                    });
                    setData(updatedData);
                    setError(null);
                }
                
            })
            .catch(error => {
                setError('Error al cargar propiedades:'+ error);
            });
    };

    const mostrarDetalle = (id) => {
        console.log(id);
        
    }

    const eliminarProp = (id) => {

    }

    const editarProp = (id) => {

    }

    const cerrarDetalles = () => {
        setShow(false);
    }

    return ( 
        <div>
            <main>
                <h1>Propiedades</h1>
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
                        <label htmlFor="hespedes">Cantidad de huéspedes</label>
                        <input type="number" name="hespedes" id="hespedes" value={filtro.huespedes} onChange={(e) => setFiltro({...filtro, huespedes: e.target.value})} />
                    </div>
                    <div className="filtrosPropiedadesButtons">
                        <input className="" type="submit" value="Aplicar filtros" />
                        <input type="button" value="Limpiar filtros" onClick={handleLimpiarFiltros} />
                    </div>
                </form>
                <div className="listaPropiedades">
                    {loading && <p>Cargando...</p>}
                    {error && <p>{error.message}</p>}

                    <ul>
                        {data.map(item => (
                            <PropiedadItem className='PropiedadItem' item={item} mostrarDetalle={mostrarDetalle} eliminarProp={eliminarProp} editarProp={editarProp} />
                        ))}
                    </ul>
                </div>
                <DetailPropiedad show={show} onClose={cerrarDetalles}></DetailPropiedad>
            </main>
        </div>
     );
}

export default PropiedadPage;