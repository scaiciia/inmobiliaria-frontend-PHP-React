import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { reservaSchema } from '../../validations/validationSchema';
import './editarReserva.css';

function EditarReserva({ reserva, propiedades, inquilinos, isOpen, onClose, onSave, editarReserva }) {
  const initialValues = {
    propiedad_id: reserva?.propiedad_id?.id || '',
    inquilino_id: reserva?.inquilino_id?.id || '',
    fecha_desde: reserva?.fecha_desde || '',
    cantidad_noches: reserva?.cantidad_noches || '',
    valor_total: reserva?.valor_total || ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
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
          validationSchema={reservaSchema}
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
                <ErrorMessage name="propiedad_id" component="div" className="error" />
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
                <ErrorMessage name="inquilino_id" component="div" className="error" />
              </label>
              <label>
                Fecha Desde:
                <Field type="date" name="fecha_desde" />
                <ErrorMessage name="fecha_desde" component="div" className="error" />
              </label>
              <label>
                Cantidad Noches:
                <Field type="number" name="cantidad_noches" />
                <ErrorMessage name="cantidad_noches" component="div" className="error" />
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
