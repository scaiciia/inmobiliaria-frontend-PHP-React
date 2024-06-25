import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/navBarComponent.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Propiedades</Link>
        </li>
        <li>
          <Link to="/tipo-propiedades">Tipos de Propiedad</Link>
        </li>
        <li>
          <Link to="/reservas">Reservas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
