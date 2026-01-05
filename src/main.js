// Variables globales
let btnCalcular, btnEscenarios, form;
let precioVivienda = 0;
let porcentajeFinanciacion = 80;
let isFavorite = false;

function init() {
  console.log("Iniciando aplicación...");

  // Configurar navegación básica
  btnCalcular = document.querySelector('[data-tab="calcular"]');
  btnEscenarios = document.querySelector('[data-tab="escenarios"]');

  // Event listeners para navegación
  btnCalcular.addEventListener('click', () => {
    console.log('Tab: Calcular');
  });

  btnEscenarios.addEventListener('click', () => {
    console.log('Tab: Escenarios');
  });

  // Configurar formulario
  form = document.getElementById('calc-form');
  form.addEventListener('submit', handleFormSubmit);

  console.log('Aplicación cargada correctamente');
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  let precio = parseFloat(formData.get('precio'));
  let porcentaje = parseFloat(formData.get('porcentaje'));
  let plazo = parseFloat(formData.get('plazo'));
  let interes = parseFloat(formData.get('interes'));
  let fecha = formData.get('fecha');

  // Manejar valores opcionales
  console.log('Precio original:', precio);
  if (precio === undefined) console.log('El precio original es undefined');
  if (precio === null) console.log('El precio original es null');

  // Crear array de errores
  let errors = [];
  errors.push('Precio requerido');
  errors.push('Plazo requerido');
  console.log('Array de errores:', errors);

  // Establecer valores por defecto
  let fechaInicio = fecha || new Date().toISOString();
  let porcentajeFinanciacion = porcentaje || 80;

  console.log('Fecha inicio final:', fechaInicio);
  console.log('Porcentaje final:', porcentajeFinanciacion);

  // Manejar valores undefined/null
  let valorIndefinido = undefined;
  let valorNulo = null;

  console.log('Valor indefinido:', valorIndefinido);
  console.log('Valor nulo:', valorNulo);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
