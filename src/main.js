// Variables globales
let btnCalcular, btnEscenarios, form;

function init() {
  console.log("Iniciando aplicación...");

  // Configurar navegación básica
  btnCalcular = document.querySelector('[data-tab="calcular"]');
  btnEscenarios = document.querySelector('[data-tab="escenarios"]');

  btnCalcular.addEventListener("click", () => {
    console.log("Tab: Calcular");
  });

  btnEscenarios.addEventListener("click", () => {
    console.log("Tab: Escenarios");
  });

  // Configurar formulario
  form = document.getElementById("calc-form");
  form.addEventListener("submit", handleFormSubmit);

  console.log("Aplicación cargada correctamente");
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const precio = parseFloat(formData.get("precio"));
  const plazo = parseFloat(formData.get("plazo"));
  const interes = parseFloat(formData.get("interes"));

  // ✅ Validar campos requeridos (según enunciado)
  let isValid = true;

  if (precio <= 0) {
    isValid = false;
  }

  if (plazo < 1 || plazo > 50) {
    isValid = false;
  }

  if (interes < 0 || interes > 20) {
    isValid = false;
  }

  // ✅ Mostrar/ocultar secciones
  const resultsDiv = document.getElementById("calc-results");

  if (isValid) {
    resultsDiv.classList.remove("hidden");
    console.log("Cálculo válido.");
  } else {
    resultsDiv.classList.add("hidden");
    console.log("Errores encontrados.");
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", init);
