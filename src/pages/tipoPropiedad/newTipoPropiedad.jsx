import React, { useState }  from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
//import { tipoPropiedadSchema } from '../../validations/validationSchema';
import { validateTipoPropiedad } from '../../validations/validations';
import apiService from '../../servicios/apiServicios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './newTipoPropiedad.css';



const NewTipoPropiedad = () => {

    const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const validationErrors = validateTipoPropiedad(values);
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setSubmitting(false);
        return;
    }
    try {
      const response = await apiService.createTipoPropiedad(values);
      if (response.status === 'success') {
        toast.success(response.message);
        resetForm();
        setTimeout(() => {
          navigate('/tipo-propiedades');
        }, 2000); 
      }  else {
        toast.error(response.error.nombre);
      } } 
    catch (error) {
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
        //validationSchema={tipoPropiedadSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="nombre">Nombre</label>
            <Field type="text" name="nombre" />
            {/*<ErrorMessage name="nombre" component="div" className="error" />*/}
            {errors.nombre && <div className="error">{errors.nombre}</div>}
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
