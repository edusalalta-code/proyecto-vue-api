const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
let currentController = null;

export const apiService = {
  // Obtener elementos evitando condiciones de carrera
  async getItems() {
    if (currentController) {
      currentController.abort();
    }
    currentController = new AbortController();

    try {
      const response = await fetch(`${BASE_URL}?_limit=6`, {
        signal: currentController.signal,
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('Petición anterior cancelada para evitar condición de carrera.');
        return null;
      }
      throw error;
    } finally {
      currentController = null;
    }
  },

  // Crear un nuevo elemento (POST)
  async createItem(nuevoItem) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoItem),
    });

    if (!response.ok) {
      throw new Error(`No se pudo guardar: Error ${response.status}`);
    }

    return await response.json();
  }
};