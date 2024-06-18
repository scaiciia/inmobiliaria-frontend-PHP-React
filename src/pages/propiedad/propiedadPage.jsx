import { useEffect, useState } from "react";
import FooterComponent from "../../components/footerComponent";
import HeaderComponent from "../../components/headerComponent";
import PropiedadItem from "../../components/propiedad/propiedadItem";

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

    useEffect(() => {
        fetch('http://localhost:80/propiedades')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No hay respuesta del servidor' + response.statusText);
                }
                return response.json();
            })
            .then(json => {
                const updatedData = json.data.map(item => {
                    if (item.imagen && item.tipo_imagen) {
                        item.imagen = item.tipo_imagen + item.imagen.split(",")[1];
                    }
                    return item;
                });

                setData(updatedData);
                
            })
            .catch(error => {
                setError(error);
            });

        fetch('http://localhost:80/localidades')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No hay respuesta del servidor' + response.statusText);
                }
                return response.json();
            })
            .then(json => {
                console.log(json.data);
                setLocalidades(json.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

         const datosEnviar = {
            disponible: filtro.disponible,
            localidad_id: isNaN(parseInt(filtro.localidad, 10)) ? null : parseInt(filtro.localidad, 10),
            fecha_inicio: filtro.fechaInicio,
            cantidad_huespedes: isNaN(parseInt(filtro.huespedes)) ? null : parseInt(filtro.huespedes)
        };
        console.log(datosEnviar);

        setLoading(true);

        // Enviar los datos al servidor
        fetch('http://localhost:80/propiedades', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datosEnviar)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo filtrar las propiedades');
            }
            return response.json();
        })
        .then(json => {
            console.log(json.data);
            const updatedData = json.data.map(item => {
                if (item.imagen && item.tipo_imagen) {
                    item.imagen = item.tipo_imagen + item.imagen.split(",")[1];
                }
                return item;
            });
            console.log(updatedData);
            setData(updatedData);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error al filtrar propiedades:', error);
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
        
    };

    return ( 
        <div>
            <HeaderComponent></HeaderComponent>
            <main>
                <h1>Propiedades</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Filtros</h3>
                    <div>
                        <label htmlFor="disponible">Disponible</label>
                        <input type="checkbox" name="disponible" id="disponible" checked={filtro.disponible} onChange={(e) => setFiltro({...filtro, disponible: e.target.checked})}/>
                    </div>
                    <div>
                        <label htmlFor="localidad">Localidad</label>
                        <select name="localidad" id="localidad" value={filtro.localidad} onChange={(e) => setFiltro({...filtro, localidad: e.target.value})}>
                            <option value="">---</option>
                            {localidades.map(localidad => (
                                <option key={localidad.id} value={localidad.id}>
                                    {localidad.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fechaInicio">Fecha de inicio</label>
                        <input type="date" name="fechaInicio" id="fechaInicio" value={filtro.fechaInicio} onChange={(e) => setFiltro({...filtro, fechaInicio: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="hespedes">Cantidad de huéspedes</label>
                        <input type="number" name="hespedes" id="hespedes" value={filtro.huespedes} onChange={(e) => setFiltro({...filtro, huespedes: e.target.value})} />
                    </div>
                    <div>
                        <input type="submit" value="Aplicar filtros" />
                        <input type="button" value="Limpiar filtros" onClick={handleLimpiarFiltros} />
                    </div>
                </form>
                
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error.message}</p>}

                <ul>
                    {data.map(item => (
                        <PropiedadItem item={item}/>
                    ))}
                </ul>
            </main>
            <FooterComponent></FooterComponent>
        </div>
     );
}

export default PropiedadPage;