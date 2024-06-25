function esVacio(variable) {
    let respuesta = false;
    if (variable === "") {
        respuesta = true;
    }
    return respuesta;
}

function EsNumero(variable) {
    let respuesta = false;
    if (!isNaN(variable)) {
        respuesta = true;
    }
    return respuesta;
}

function esStringValido(variable) {
    const direccionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
    return direccionRegex.test(variable);
}

function validarFecha(variable) {
    const date = new Date(variable);
    return !isNaN(date.getTime());
}

function validarEmail(variable) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(variable);
}

export {EsNumero, esVacio, esStringValido, validarFecha, validarEmail}

