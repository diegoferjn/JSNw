import { calcularCuotaMensual, formatearMoneda } from './loans.js';
import { readAndValidateForm } from './forms.js';
import { renderResults, renderList, showError, clearError, hideResults, switchTab } from './ui.js';
import { loadItems, saveItems, addItem, updateItem, removeItem } from './store.js';

let form;
let items = [];

function init() {
  // Tabs
  const btnCalcular = document.querySelector('[data-tab="calcular"]');
  const btnEscenarios = document.querySelector('[data-tab="escenarios"]');

  btnCalcular?.addEventListener('click', () => switchTab('calcular'));
  btnEscenarios?.addEventListener('click', () => switchTab('escenarios'));

  // Form submit
  form = document.getElementById('calc-form');
  form?.addEventListener('submit', handleSubmit);

  // Cargar y renderizar lista en init (enunciado)
  items = loadItems();
  renderList(items, { seleccionarItem, editarItem, eliminarItem });

  console.log('Escenarios iniciales:', items);
}

function handleSubmit(event) {
  event.preventDefault();

  const { ok, errores, data } = readAndValidateForm(form);

  if (!ok) {
    showError(errores[0]);
    hideResults();
    return;
  }

  clearError();

  const meses = data.plazoAnios * 12;
  const cuotaMensual = calcularCuotaMensual(data.principal, data.interes, meses);
  const costeTotal = cuotaMensual * meses;

  const resumen = {
    principal: data.principal,
    cuotaMensual,
    costeTotal
  };

  // Schedule mínimo para cumplir firma renderResults(resumen, schedule)
  const schedule = [
    { mes: 1, cuota: cuotaMensual },
    { mes: 2, cuota: cuotaMensual },
    { mes: 3, cuota: cuotaMensual }
  ];

  // Enunciado: llamar tras cálculo exitoso
  renderResults(resumen, schedule);

  // (Extra práctico) Guardamos un escenario nuevo
  const nuevo = {
    id: Date.now(),
    name: `Hipoteca ${data.fecha} (${formatearMoneda(cuotaMensual)}/mes)`,
    value: data.principal
  };

  items = addItem(items, nuevo);
  saveItems(items);
  renderList(items, { seleccionarItem, editarItem, eliminarItem });
}

// --- Botones por item (enunciado) ---

function seleccionarItem(id) {
  const item = items.find(it => it.id === id);
  if (!item) return;

  console.log('Seleccionado:', item);

  // Ejemplo útil: rellena el precio con el valor y te manda a Calcular
  switchTab('calcular');

  const precioInput = document.getElementById('precio');
  if (precioInput) precioInput.value = String(item.value);
}

function editarItem(id) {
  const item = items.find(it => it.id === id);
  if (!item) return;

  const nuevoNombre = prompt('Nuevo nombre:', item.name);
  if (nuevoNombre === null) return;

  const nuevoValorRaw = prompt('Nuevo valor (número):', String(item.value));
  if (nuevoValorRaw === null) return;

  const nuevoValor = Number(nuevoValorRaw);
  if (!Number.isFinite(nuevoValor) || nuevoValor <= 0) {
    alert('Valor inválido. Debe ser un número mayor que 0.');
    return;
  }

  const updated = { ...item, name: nuevoNombre.trim() || item.name, value: nuevoValor };

  items = updateItem(items, updated);
  saveItems(items);
  renderList(items, { seleccionarItem, editarItem, eliminarItem });

  console.log('Editado:', updated);
}

function eliminarItem(id) {
  const item = items.find(it => it.id === id);
  if (!item) return;

  const ok = confirm(`¿Eliminar "${item.name}"?`);
  if (!ok) return;

  items = removeItem(items, id);
  saveItems(items);
  renderList(items, { seleccionarItem, editarItem, eliminarItem });

  console.log('Eliminado:', id);
}

document.addEventListener('DOMContentLoaded', init);
