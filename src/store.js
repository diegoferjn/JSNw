// Guardar datos en localStorage
export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Cargar datos desde localStorage
export function loadFromLocalStorage(key) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}

// Estado inicial
export function initState() {
  return {
    datos: [],
    contador: 0
  };
}

// Añadir datos al estado
export function addData(dato) {
  const state = loadFromLocalStorage('hipocalc:v1') || initState();
  state.datos.push(dato);
  state.contador++;
  saveToLocalStorage('hipocalc:v1', state);
  return state;
}
