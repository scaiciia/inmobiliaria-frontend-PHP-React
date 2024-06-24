import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropiedadPage from './pages/propiedad/propiedadPage';
import ReservaPage from "./pages/reserva/reservaPage";
import NuevaReserva from './pages/reserva/nuevaReserva';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropiedadPage/>} />
        <Route path="/reservas" element={<ReservaPage/>} />
        <Route path="/reservas/nueva" element={<NuevaReserva />} /> {/* Añade la nueva ruta */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

