import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  propiedad_id: Yup.number().required('Propiedad es requerida'),
  inquilino_id: Yup.number().required('Inquilino es requerido'),
  fecha_desde: Yup.date().required('Fecha Desde es requerida'),
  cantidad_noches: Yup.number().required('Cantidad de Noches es requerida'),
  valor_total: Yup.number().required('Valor Total es requerido')
});
