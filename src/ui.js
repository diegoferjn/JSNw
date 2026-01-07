import { formatearMoneda } from './loans.js';

export function renderResults(resumen, schedule) {
  const resultsWrap = document.getElementById('calc-results');
  const resultsContent = document.getElementById('results-content');

  if (!resultsWrap || !resultsContent) return;

  resultsWrap.classList.remove('hidden');

  const cuota = resumen.cuotaMensual;
  const costeTotal = resumen.costeTotal;
  const principal = resumen.principal;

  // (Opcional) Mostramos 3 primeras filas del schedule si existe
  const preview = Array.isArray(schedule) ? schedule.slice(0, 3) : [];

  const previewHtml = preview.length
    ? `
      <h4>Primeras cuotas (preview)</h4>
      <ul>
        ${preview.map(r => `<li>Mes ${r.mes}: cuota ${formatearMoneda(r.cuota)}</li>`).join('')}
      </ul>
    `
    : '';

  resultsContent.innerHTML = `
    <h3>Resumen del cálculo</h3>
    <p><strong>Principal:</strong> ${formatearMoneda(principal)}</p>
    <p><strong>Cuota mensual:</strong> ${formatearMoneda(cuota)}</p>
    <p><strong>Coste total:</strong> ${formatearMoneda(costeTotal)}</p>
    ${previewHtml}
  `;
}

export function renderList(items, handlers) {
  const container = document.getElementById('escenarios-content');
  if (!container) return;

  container.innerHTML = '';

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = `<p>No hay escenarios disponibles.</p>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';

    const title = document.createElement('h4');
    title.textContent = item.name;

    const value = document.createElement('p');
    value.textContent = `Valor: ${item.value}`;

    const actions = document.createElement('div');
    actions.className = 'item-actions';

    const btnSel = document.createElement('button');
    btnSel.textContent = 'Seleccionar';

    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Editar';

    const btnDel = document.createElement('button');
    btnDel.textContent = 'Eliminar';

    // Listeners (manual II/III)
    btnSel.addEventListener('click', () => handlers.seleccionarItem(item.id));
    btnEdit.addEventListener('click', () => handlers.editarItem(item.id));
    btnDel.addEventListener('click', () => handlers.eliminarItem(item.id));

    actions.append(btnSel, btnEdit, btnDel);
    card.append(title, value, actions);
    container.appendChild(card);
  });
}

export function showError(message) {
  const errorDiv = document.getElementById('error-messages');
  if (!errorDiv) return;
  errorDiv.innerHTML = `<div class="error">${message}</div>`;
}

export function clearError() {
  const errorDiv = document.getElementById('error-messages');
  if (!errorDiv) return;
  errorDiv.innerHTML = '';
}

export function hideResults() {
  const resultsWrap = document.getElementById('calc-results');
  if (resultsWrap) resultsWrap.classList.add('hidden');
}

export function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  const section = document.getElementById(tabName);
  const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);

  if (section) section.classList.add('active');
  if (btn) btn.classList.add('active');
}
