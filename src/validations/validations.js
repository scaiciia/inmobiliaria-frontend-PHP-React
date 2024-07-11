export function validateTipoPropiedad (data) {
    const errors = [];

    if (!data.nombre || typeof data.nombre !== 'string') {
        errors.nombre = 'El nombre es requerido';
    } else if (data.nombre.length > 50) {
        errors.nombre = 'El nombre debe ser menor a 50 caracteres';
    }

    return errors;
};

export function validateReserva(data) {
    const errors = [];

    // Validación de propiedad_id
    if (!data.propiedad_id) {
        errors.propiedad_id = 'Propiedad es requerida';
    } else if (isNaN(Number(data.propiedad_id))) {
        errors.propiedad_id = 'Propiedad debe ser un número';
    }

    // Validación de inquilino_id
    if (!data.inquilino_id) {
        errors.inquilino_id = 'Inquilino es requerido';
    } else if (isNaN(Number(data.inquilino_id))) {
        errors.inquilino_id = 'Inquilino debe ser un número';
    }

    // Validación de fecha_desde
    if (!data.fecha_desde) {
        errors.fecha_desde = 'Fecha Desde es requerida';
    } else if (isNaN(Date.parse(data.fecha_desde))) {
        errors.fecha_desde = 'Fecha Desde debe ser una fecha válida';
    }

    // Validación de cantidad_noches
    if (!data.cantidad_noches) {
        errors.cantidad_noches = 'Cantidad de Noches es requerida';
    } else if (isNaN(Number(data.cantidad_noches))) {
        errors.cantidad_noches = 'Cantidad de Noches debe ser un número';
    }

    return errors;
}