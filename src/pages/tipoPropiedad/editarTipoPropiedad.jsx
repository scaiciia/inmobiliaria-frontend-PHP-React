import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { tipoPropiedadSchema } from '../../validations/validationSchema';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../servicios/apiServicios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './editarTipoPropiedad.css';


  
  const EditarTipoPropiedad = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({ nombre: '' });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await apiService.getTiposPropiedad();
          const tipoPropiedad = response.find(item => item.id === parseInt(id));
        if (tipoPropiedad) {
          setInitialValues({ nombre: tipoPropiedad.nombre });
        } else {
          toast.error('Tipo de propiedad no encontrado');
        }
          setLoading(false);
        } catch (error) {
          toast.error('Error fetching tipo de propiedad');
          setLoading(false);
        }
      };
      fetchData();
    }, [id]);
  
    const handleSubmit = async (values, { setSubmitting }) => {
      try {
        const response = await apiService.updateTipoPropiedad(id, values);
        if (response.status === 'success') {
          toast.success(response.message);
          setTimeout(() => {
            navigate('/tipo-propiedades');
          }, 2000);
        } else {
          toast.error(response.message || 'Error al actualizar el tipo de propiedad');
        }
      } catch (error) {
        toast.error('Error al actualizar el tipo de propiedad');
      } finally {
        setSubmitting(false);
      }
    };
  
    if (loading) return <p>Loading...</p>;
  
    return (
      <div className="edit-tipo-propiedad-container">
        <h1>Editar Tipo de Propiedad</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={tipoPropiedadSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="nombre">Nombre</label>
              <Field type="text" name="nombre" />
              <ErrorMessage name="nombre" component="div" className="error" />
  
              <button type="submit" disabled={isSubmitting}>
                Guardar
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    );
  };

export default EditarTipoPropiedad;
