import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { reservaSchema } from '../../validations/validationSchema'; 
import apiService from '../../servicios/apiServicios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/pages/reserva/nuevaReserva.css'; 
import { useNavigate } from 'react-router-dom';

const NuevaReserva = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propiedadesData, inquilinosData] = await Promise.all([
          apiService.getPropiedades(),
          apiService.getInquilinos()
        ]);
        const propiedadesDisponibles = propiedadesData.filter(propiedad => propiedad.disponible === 1);
        setPropiedades(propiedadesDisponibles);
        setInquilinos(inquilinosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await apiService.createReserva(values);
      console.log('response',response);
      if (response.code === 201) {
        toast.success(response.message + " sera redirigido a la pagina de reservas" || '  Reserva creada con éxito te redirigiremos a la pantalla de reservas');
        setTimeout(() => {
          navigate('/reservas'); 
        }, 3000); 
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error('Error creando la reserva');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-reserva-container">
      <h2>Crear Nueva Reserva</h2>
      <Formik
        initialValues={{
          propiedad_id: '',
          inquilino_id: '',
          fecha_desde: '',
          cantidad_noches: '',
          valor_total: ''
        }}
        validationSchema={reservaSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="new-reserva-form">
            <div className="form-group">
              <label htmlFor="propiedad_id">Propiedad:</label>
              <Field as="select" name="propiedad_id">
                <option value="">Seleccione una propiedad</option>
                {propiedades.map((propiedad) => (
                  <option key={propiedad.id} value={propiedad.id}>
                    {propiedad.domicilio}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="propiedad_id" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="inquilino_id">Inquilino:</label>
              <Field as="select" name="inquilino_id">
                <option value="">Seleccione un inquilino</option>
                {inquilinos.map((inquilino) => (
                  <option key={inquilino.id} value={inquilino.id}>
                    {inquilino.nombre} {inquilino.apellido}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="inquilino_id" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="fecha_desde">Fecha Desde:</label>
              <Field type="date" name="fecha_desde" />
              <ErrorMessage name="fecha_desde" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="cantidad_noches">Cantidad de Noches:</label>
              <Field type="number" name="cantidad_noches" />
              <ErrorMessage name="cantidad_noches" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>Crear Reserva</button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default NuevaReserva;
