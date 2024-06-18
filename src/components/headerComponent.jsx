import Icono from '../assets/images/Icono.png'
import '../assets/styles/components/headerComponent.css';

function HeaderComponent() {
    return ( 
        <header>
            <img src={Icono} alt="Icono" />
            <span>InmobilTemp</span>
        </header>
    );
}

export default HeaderComponent;