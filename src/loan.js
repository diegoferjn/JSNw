// Función para calcular principal
export function calcularPrincipal(precio, porcentaje) {
  return Math.round((precio * porcentaje) / 100);
}

// Validar interés
export function esValidoInteres(interes) {
  return interes >= 0 && interes <= 20;
}

// Validar plazo
export function esValidoPlazo(plazo) {
  return plazo >= 1 && plazo <= 50;
}

// Calcular cuota mensual
export function calcularCuotaMensual(principal, interesAnual, meses) {
  const interesMensual = interesAnual / 100 / 12;
  return principal *
    (interesMensual * Math.pow(1 + interesMensual, meses)) /
    (Math.pow(1 + interesMensual, meses) - 1);
}
