import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropiedadPage from './pages/propiedad/propiedadPage';
import ReservaPage from "./pages/reserva/reservaPage";
import NuevaReserva from './pages/reserva/nuevaReserva';
import TipoPropiedadPage from './pages/tipoPropiedad/tipoPropiedadPage';
import NewTipoPropiedad from './pages/tipoPropiedad/newTipoPropiedad';
import EditarTipoPropiedad from './pages/tipoPropiedad/editarTipoPropiedad'; 


import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropiedadPage/>} />
        <Route path="/reservas" element={<ReservaPage/>} />
        <Route path="/reservas/nueva" element={<NuevaReserva />} />
        <Route path="/tipo-propiedades" element={<TipoPropiedadPage />} /> 
        <Route path="/tipo-propiedades/nueva" element={<NewTipoPropiedad />} /> 
        <Route path="/tipo-propiedades/editar/:id" element={<EditarTipoPropiedad />} /> 

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

