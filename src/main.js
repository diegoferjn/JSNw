import {
  calcularPrincipal,
  esValidoInteres,
  esValidoPlazo,
  calcularCuotaMensual
} from './loans.js';

let form;

function init() {
  form = document.getElementById('calc-form');
  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const precio = parseFloat(formData.get('precio'));
  const porcentaje = parseFloat(formData.get('porcentaje'));
  const plazo = parseFloat(formData.get('plazo'));
  const interes = parseFloat(formData.get('interes'));

  let isValid = true;
  let errores = [];

  if (precio <= 0) {
    isValid = false;
    errores.push('Precio inválido');
  }

  if (!esValidoPlazo(plazo)) {
    isValid = false;
    errores.push('Plazo inválido');
  }

  if (!esValidoInteres(interes)) {
    isValid = false;
    errores.push('Interés inválido');
  }

  if (porcentaje <= 0 || porcentaje > 100) {
    isValid = false;
    errores.push('Porcentaje inválido');
  }

  const resultsDiv = document.getElementById('calc-results');
  const errorDiv = document.getElementById('error-messages');

  if (!isValid) {
    resultsDiv.classList.add('hidden');
    errorDiv.innerHTML = `<div class="error">${errores[0]}</div>`;
    return;
  }

  const principal = calcularPrincipal(precio, porcentaje);
  const cuota = calcularCuotaMensual(principal, interes, plazo * 12);

  mostrarResultados(principal, cuota);
}

function mostrarResultados(principal, cuota) {
  const resultsDiv = document.getElementById('calc-results');
  const resultsContent = document.getElementById('results-content');

  resultsDiv.classList.remove('hidden');
  resultsContent.innerHTML = `
    <p><strong>Principal:</strong> ${principal}</p>
    <p><strong>Cuota mensual:</strong> ${cuota.toFixed(2)}</p>
  `;
}

document.addEventListener('DOMContentLoaded', init);
