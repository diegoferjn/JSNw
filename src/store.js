const LS_KEY = 'hipoteca:escenarios:v1';

function seed() {
  return [
    { id: 1, name: 'Escenario Base', value: 250000 },
    { id: 2, name: 'Vivienda Premium', value: 420000 },
    { id: 3, name: 'Opción Económica', value: 180000 }
  ];
}

export function loadItems() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return seed();
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seed();
  } catch {
    return seed();
  }
}

export function saveItems(items) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export function addItem(items, item) {
  return [...items, item];
}

export function updateItem(items, updated) {
  return items.map(it => (it.id === updated.id ? updated : it));
}

export function removeItem(items, id) {
  return items.filter(it => it.id !== id);
}
