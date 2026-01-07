// Función asíncrona para cargar datos
export async function loadSeedData() {
  try {
    const response = await fetch('./data/seed-scenarios.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Función de delay
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
