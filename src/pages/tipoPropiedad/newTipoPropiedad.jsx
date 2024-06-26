import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { tipoPropiedadSchema } from '../../validations/validationSchema';
import apiService from '../../servicios/apiServicios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './newTipoPropiedad.css';



const NewTipoPropiedad = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await apiService.createTipoPropiedad(values);
      if (response.status === 'success') {
        toast.success(response.message);
        resetForm();
        setTimeout(() => {
          navigate('/tipo-propiedades');
        }, 2000); 
      } else {
        toast.error(response.message || 'Error al crear el tipo de propiedad');
      }
    } catch (error) {
      toast.error('Error al crear el tipo de propiedad');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-tipo-propiedad-container">
      <h1>Crear Nuevo Tipo de Propiedad</h1>
      <Formik
        initialValues={{ nombre: '' }}
        validationSchema={tipoPropiedadSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="nombre">Nombre</label>
            <Field type="text" name="nombre" />
            <ErrorMessage name="nombre" component="div" className="error" />
            <button type="submit" disabled={isSubmitting}>
              Crear
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default NewTipoPropiedad;
