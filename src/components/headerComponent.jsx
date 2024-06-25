import Icono from '../assets/images/Icono.png'
import '../assets/styles/components/headerComponent.css';
import NavBar from './NavBar';

function HeaderComponent() {
    return ( 
        <header>
            <div className='Logo'>
                <img src={Icono} alt="Icono" />
                <span>InmobilTemp</span>
            </div>
            <div>
                <NavBar></NavBar>
            </div>
        </header>
    );
}

export default HeaderComponent;