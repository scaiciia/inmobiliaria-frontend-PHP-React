import React, {useState} from 'react';
import { Formik, Field, Form} from 'formik';
//import { reservaSchema } from '../../validations/validationSchema';
import { validateReserva } from '../../validations/validations';
import './editarReserva.css';

function EditarReserva({ reserva, propiedades, inquilinos, isOpen, onClose, onSave, editarReserva }) {
  const [errors, setErrors] = useState([])
  
  const initialValues = {
    propiedad_id: reserva?.propiedad_id?.id || '',
    inquilino_id: reserva?.inquilino_id?.id || '',
    fecha_desde: reserva?.fecha_desde || '',
    cantidad_noches: reserva?.cantidad_noches || '',
    valor_total: reserva?.valor_total || ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setErrors([]);
    const validations = validateReserva(values);
    if (Object.keys(validations).length > 0) {
      setErrors(validations);
      setSubmitting(false);
      return;
    }
    
    editarReserva(reserva.id, values, onSave);
    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>Editar Reservación</h2>
        <Formik
          initialValues={initialValues}
          //validationSchema={reservaSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <label>
                Propiedad:
                <Field as="select" name="propiedad_id">
                  <option value="">Seleccione una propiedad</option>
                  {propiedades.map((propiedad) => (
                    <option key={propiedad.id} value={propiedad.id}>
                      {propiedad.domicilio}
                    </option>
                  ))}
                </Field>
                {/*<ErrorMessage name="propiedad_id" component="div" className="error" />*/}
                {errors.propiedad_id && <div className="error">{errors.propiedad_id}</div>}
              </label>
              <label>
                Inquilino:
                <Field as="select" name="inquilino_id">
                  <option value="">Seleccione un inquilino</option>
                  {inquilinos.map((inquilino) => (
                    <option key={inquilino.id} value={inquilino.id}>
                      {inquilino.nombre} {inquilino.apellido}
                    </option>
                  ))}
                </Field>
                {/*<ErrorMessage name="inquilino_id" component="div" className="error" />*/}

              </label>
              {errors.inquilino_id && <div className="error">{errors.inquilino_id}</div>}

              <label>
                Fecha Desde:
                <Field type="date" name="fecha_desde" />
                {/*<ErrorMessage name="fecha_desde" component="div" className="error" />*/}
                {errors.fecha_desde && <div className="error">{errors.fecha_desde}</div>}
              </label>
              <label>
                Cantidad Noches:
                <Field type="number" name="cantidad_noches" />
                {/*<ErrorMessage name="cantidad_noches" component="div" className="error" />*/}
                {errors.cantidad_noches && <div className="error">{errors.cantidad_noches}</div>}
              </label>
              <div className="button-container">
                <button type="submit" disabled={isSubmitting}>Guardar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditarReserva;
