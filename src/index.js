import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import FooterComponent from './components/footerComponent';
import AppRoutes from './routes'; // Importa las rutas
import "./assets/styles/components/footerComponent.css"
import './assets/styles/global.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <AppRoutes /> 
      <FooterComponent/>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

