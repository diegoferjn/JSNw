import { calcularPrincipal, esValidoInteres, esValidoPlazo } from './loans.js';

export function readAndValidateForm(formEl) {
  const fd = new FormData(formEl);

  const precio = parseFloat(fd.get('precio'));
  const porcentaje = parseFloat(fd.get('porcentaje'));
  const plazoAnios = parseFloat(fd.get('plazo'));
  const interes = parseFloat(fd.get('interes'));
  const fecha = String(fd.get('fecha') || '');

  const errores = [];

  if (!Number.isFinite(precio) || precio <= 0) errores.push('Precio debe ser mayor que 0');
  if (!Number.isFinite(porcentaje) || porcentaje < 1 || porcentaje > 100) errores.push('Porcentaje debe estar entre 1% y 100%');
  if (!Number.isFinite(plazoAnios) || !esValidoPlazo(plazoAnios)) errores.push('Plazo debe estar entre 1 y 50 años');
  if (!Number.isFinite(interes) || !esValidoInteres(interes)) errores.push('Interés debe estar entre 0% y 20%');
  if (!fecha || !/^\d{4}-\d{2}$/.test(fecha)) errores.push('Fecha inicio no es válida (YYYY-MM)');

  const principal = calcularPrincipal(precio, porcentaje);
  if (!Number.isFinite(principal) || principal <= 0) errores.push('El principal no puede ser 0');

  return {
    ok: errores.length === 0,
    errores,
    data: { precio, porcentaje, plazoAnios, interes, fecha, principal }
  };
}
