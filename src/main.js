function init() {
  // 1. Recorrer array de números
  const numeros = [1, 2, 3, 4, 5];
  let mayoresQueTres = 0;

  for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i] * 2);
    if (numeros[i] > 3) {
      mayoresQueTres++;
    }
  }

  console.log('Números mayores que 3:', mayoresQueTres);

  // 2. Generar tabla de amortización
  const schedule = [];
  const total = 100000;

  for (let i = 0; i < 12; i++) {
    schedule.push({
      mes: i + 1,
      fecha: new Date(2024, i, 1),
      cuota: 1000,
      interes: 100,
      capital: 900,
      saldo: total - (900 * i)
    });
  }

  // 3. Mostrar resultados en el DOM
  const resultsDiv = document.getElementById('calc-results');
  const contentDiv = document.getElementById('results-content');

  for (const item of schedule) {
    const p = document.createElement('p');
    p.textContent =
      `Mes ${item.mes} - Cuota: ${item.cuota}€ - Interés: ${item.interes}€ - Capital: ${item.capital}€ - Saldo: ${item.saldo}€`;
    contentDiv.appendChild(p);
  }

  resultsDiv.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', init);
