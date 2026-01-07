import {
  calcularPrincipal,
  esValidoInteres,
  esValidoPlazo,
  calcularCuotaMensual,
  formatearMoneda
} from './loans.js';

import { loadSeedData, delay } from './store.js';

let form;

function init() {
  cargarDatosIniciales();
}

async function cargarDatosIniciales() {
  try {
    await delay(500);
    const datos = await loadSeedData();
    mostrarEscenarios(datos);
  } catch (error) {
    const errorDiv = document.getElementById('error-messages');
    errorDiv.innerHTML = '<div class="error">Error al cargar datos iniciales</div>';
  }
}

function mostrarEscenarios(escenarios) {
  const section = document.getElementById('escenarios');

  if (escenarios.length > 0) {
    section.innerHTML += `<p>Se cargaron ${escenarios.length} escenarios</p>`;
  } else {
    section.innerHTML += `<p>No hay escenarios disponibles</p>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
