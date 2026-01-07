import { loadFromLocalStorage, initState, addData } from './store.js';

function init() {
  console.log('Iniciando aplicación...');

  // Cargar datos al iniciar
  let estado = loadFromLocalStorage('hipocalc:v1');

  if (!estado) {
    console.log('No hay datos en localStorage, inicializando estado');
    estado = initState();
    console.log('Estado inicial:', estado);
  } else {
    console.log('Datos cargados desde localStorage:', estado);
  }

  // Añadir un dato de ejemplo
  const nuevoEstado = addData('Dato de ejemplo');
  console.log('Estado actualizado:', nuevoEstado);
}

document.addEventListener('DOMContentLoaded', init);
