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

  // Recorrer botones de navegación
  let botones = [btnCalcular, btnEscenarios];
  botones.forEach((boton, index) => {
    boton.addEventListener('click', () => {
      const tabName = index === 0 ? 'calcular' : 'escenarios';
      console.log('Tab:', tabName);
      switchTab(tabName);
    });
  });

  // Configurar formulario
  form = document.getElementById('calc-form');
  form.addEventListener('submit', handleFormSubmit);

  // ===== EJERCICIO: MÉTODOS FUNDAMENTALES DE ARRAYS =====
  console.log('Ejercicio de métodos de arrays:');

  // Filtrar números
  let numeros = [1, 5, 10, 15, 20, 25];
  let mayoresQue10 = numeros.filter(num => num > 10);
  console.log('Números mayores que 10:', mayoresQue10);

  // Mapear datos
  let dobles = numeros.map(num => num * 2);
  console.log('Números multiplicados por 2:', dobles);

  let objetos = numeros.map(num => ({ valor: num, doble: num * 2 }));
  console.log('Números con doble:', objetos);

  // Ordenar números (sin mutar el original)
  let ascendente = [...numeros].sort((a, b) => a - b);
  console.log('Números ascendente:', ascendente);

  let descendente = [...numeros].sort((a, b) => b - a);
  console.log('Números descendente:', descendente);

  console.log('Aplicación cargada correctamente');
}

function switchTab(tabName) {
  // Ocultar todas las secciones
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Mostrar solo la seleccionada
  document.getElementById(tabName).classList.add('active');
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  let precio = parseFloat(formData.get('precio'));
  let porcentaje = parseFloat(formData.get('porcentaje'));
  let plazo = parseFloat(formData.get('plazo'));
  let interes = parseFloat(formData.get('interes'));
  let fecha = formData.get('fecha');

  // Validar campos requeridos
  let isValid = true;
  let errorMessages = [];

  if (precio <= 0) {
    isValid = false;
    errorMessages.push("Precio debe ser mayor que 0");
  }

  if (plazo < 1 || plazo > 50) {
    isValid = false;
    errorMessages.push("Plazo debe estar entre 1 y 50 años");
  }

  if (interes < 0 || interes > 20) {
    isValid = false;
    errorMessages.push("Interés debe estar entre 0% y 20%");
  }

  // Validar porcentaje de financiación
  if (porcentaje < 1 || porcentaje > 100) {
    isValid = false;
    errorMessages.push("Porcentaje debe estar entre 1% y 100%");
  }

  // Calcular principal
  const principal = (precio * porcentaje) / 100;
  if (principal === 0) {
    isValid = false;
    errorMessages.push("El principal no puede ser 0");
  }

  // Mostrar/ocultar secciones
  const resultsDiv = document.getElementById('calc-results');
  const errorDiv = document.getElementById('error-messages');

  if (isValid) {
    resultsDiv.classList.remove('hidden');
    errorDiv.innerHTML = '';

    // Generar tabla de amortización
    generarTablaAmortizacion();

    console.log('Cálculo válido. Principal:', principal);
  } else {
    resultsDiv.classList.add('hidden');
    errorDiv.innerHTML = '<div class="error">' + errorMessages[0] + '</div>';
    console.log('Errores encontrados:', errorMessages);
  }
}

function generarTablaAmortizacion() {
  // Crear array para tabla de amortización
  let schedule = [];

  // Generar 12 meses de datos con bucle for
  for (let i = 0; i < 12; i++) {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + i);

    schedule.push({
      mes: i + 1,
      fecha: fecha,
      cuota: 1000,
      interes: 100,
      capital: 900,
      saldo: 100000 - (i * 900)
    });
  }

  // Recorrer y mostrar resultados
  const resultsContent = document.getElementById('results-content');
  resultsContent.innerHTML = '';

  schedule.forEach((mes) => {
    const p = document.createElement('p');
    p.textContent = `Mes ${mes.mes}: Cuota ${mes.cuota}€, Interés ${mes.interes}€, Capital ${mes.capital}€, Saldo ${mes.saldo}€`;
    resultsContent.appendChild(p);
  });

  console.log('Tabla de amortización generada:', schedule);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
