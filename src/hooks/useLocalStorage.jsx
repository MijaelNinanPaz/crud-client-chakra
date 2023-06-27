// Convertir objeto a cadena de texto
const objeto = { clave: 'valor' };
const objetoString = JSON.stringify(objeto);

// Guardar objeto en localStorage
localStorage.setItem('clave', objetoString);

// Obtener objeto de localStorage
const objetoRecuperado = JSON.parse(localStorage.getItem('clave'));

// Eliminar objeto de localStorage
localStorage.removeItem('clave');