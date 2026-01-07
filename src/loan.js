export function calcularPrincipal(precio, porcentaje) {
  return Math.round((precio * porcentaje) / 100);
}

export function esValidoInteres(interes) {
  return interes >= 0 && interes <= 20;
}

export function esValidoPlazo(plazo) {
  return plazo >= 1 && plazo <= 50;
}

export function calcularCuotaMensual(principal, interesAnual, meses) {
  const interesMensual = interesAnual / 100 / 12;

  if (interesMensual === 0) {
    return principal / meses;
  }

  return principal *
    (interesMensual * Math.pow(1 + interesMensual, meses)) /
    (Math.pow(1 + interesMensual, meses) - 1);
}

export function formatearMoneda(valor) {
  return valor.toFixed(2) + ' €';
}
