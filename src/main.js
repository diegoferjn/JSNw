// Variables globales
let btnCalcular, btnEscenarios, form;

function init() {
  console.log("Iniciando aplicación...");

  // Navegación básica
  btnCalcular = document.querySelector('[data-tab="calcular"]');
  btnEscenarios = document.querySelector('[data-tab="escenarios"]');

  btnCalcular.addEventListener('click', () => {
    console.log('Tab: Calcular');
  });

  btnEscenarios.addEventListener('click', () => {
    console.log('Tab: Escenarios');
  });

  // Formulario
  form = document.getElementById('calc-form');
  form.addEventListener('submit', handleFormSubmit);

  crearEstructuraDatos();
  manejarFechas();
  crearEscenarios();
  crearTablaAmortizacion();

  console.log('Aplicación cargada correctamente');
}

// 1️⃣ Crear estructura de datos completa
function crearEstructuraDatos() {
  const inputs = {
    precioVivienda: 200000,
    porcentajeFinanciacion: 80,
    principal: 160000,
    plazoAnios: 30,
    interesNominalAnual: 3.5,
    fechaInicioISO: new Date().toISOString()
  };

  const results = {
    cuota: 1000,
    interesesTotales: 200000,
    costeTotal: 360000,
    fechaFinISO: new Date(Date.now() + 30 * 365 * 24 * 60 * 60 * 1000).toISOString()
  };

  const schedule = [];

  const scenario = {
    inputs: inputs,
    results: results,
    schedule: schedule
  };

  console.log("Scenario completo:", scenario);
}

// 2️⃣ Manejo de fechas
function manejarFechas() {
  const fechaInicio = new Date();
  const fechaFin = new Date(
    fechaInicio.getFullYear() + 30,
    fechaInicio.getMonth(),
    fechaInicio.getDate()
  );

  const fechaInicioISO = fechaInicio.toISOString();

  console.log("Fecha inicio:", fechaInicio);
  console.log("Fecha fin:", fechaFin);
  console.log("Fecha inicio ISO:", fechaInicioISO);
}

// 3️⃣ Crear array de escenarios
function crearEscenarios() {
  const scenarios = [];

  scenarios.push({ nombre: "Escenario 1", precio: 200000, plazo: 30, interes: 3 });
  scenarios.push({ nombre: "Escenario 2", precio: 250000, plazo: 25, interes: 3.5 });
  scenarios.push({ nombre: "Escenario 3", precio: 300000, plazo: 20, interes: 4 });

  console.log("Número de escenarios:", scenarios.length);
  console.log("Primer escenario:", scenarios[0]);
}

// 4️⃣ Tabla de amortización básica
function crearTablaAmortizacion() {
  const schedule = [];
  const fechaBase = new Date();

  schedule.push({
    mes: 1,
    fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth() + 1, fechaBase.getDate()),
    cuota: 1000,
    interes: 500,
    capital: 500,
    saldo: 159500
  });

  schedule.push({
    mes: 2,
    fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth() + 2, fechaBase.getDate()),
    cuota: 1000,
    interes: 498,
    capital: 502,
    saldo: 158998
  });

  schedule.push({
    mes: 3,
    fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth() + 3, fechaBase.getDate()),
    cuota: 1000,
    interes: 496,
    capital: 504,
    saldo: 158494
  });

  console.log("Tabla de amortización:", schedule);
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log("Formulario enviado");
}

document.addEventListener('DOMContentLoaded', init);
