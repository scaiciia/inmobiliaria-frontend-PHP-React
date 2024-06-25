import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import '../assets/styles/components/modalsComponent.css'

function ModalsComponent(props) {
    return ( 
        <div className={`offcanvas ${props.show ? 'show' : ''}`}>
            <div className="offcanvas-content">
                <FontAwesomeIcon className="offcanvas-close" onClick={props.onClose} icon={faCircleXmark} />
                <div>
                    {props.children}
                </div>
            </div>
            <div className="offcanvas-backdrop" onClick={props.onClose}></div>
        </div>
     );
}

export default ModalsComponent;