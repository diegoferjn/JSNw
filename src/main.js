// Variables globales
let btnCalcular, btnEscenarios, form;
let precioVivienda = 0;
let porcentajeFinanciacion = 80;
let isFavorite = false;

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

  form = document.getElementById('calc-form');

  console.log('Aplicación cargada correctamente');
}

// Trabajar con valores primitivos
let nombre = "Mi escenario";
let esFavorito = false;
let precio = 200000;

console.log('Nombre:', nombre);
console.log('Es favorito:', esFavorito);
console.log('Precio:', precio);
console.log('Precio como string:', precio.toString());

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
