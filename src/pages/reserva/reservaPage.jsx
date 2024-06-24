import {useState, useEffect} from 'react';
import FooterComponent from "../../components/footerComponent";
import HeaderComponent from "../../components/headerComponent";
import apiService from '../../servicios/apiServicios';
import ReservaItem from '../../components/reserva/reservaItem';

function ReservaPage () {

    const [reservas, setReservas] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const fetchReservas = async () => {
            try {
              const data = await apiService.getReservas();
              setReservas(data);
              setLoading(false);
            } catch (error) {
              setLoading(false); // El error ya ha sido manejado y notificado
            }
          };
          fetchReservas();
    },[])

    if (loading) return <p>Loading...</p>;

    return(

        <>
        <HeaderComponent></HeaderComponent>
        <div>
      <h1>Reservas</h1>
      <ul style={{display: "flexbox", flexDirection: "column",listStyleType: "none", padding: 0}}>
        {reservas.map(reserva => (
        <li key = {reserva.id}>
          <ReservaItem className='ReservaItem' reserva = {reserva}></ReservaItem>
        </li>
        ))}
      </ul>
    </div>
        <FooterComponent></FooterComponent>
        </>
    )
};

export default ReservaPage;