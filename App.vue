<script setup>
import { ref, onMounted } from 'vue';
import { apiService } from './services/apiService';
import ItemForm from './components/ItemForm.vue';
import ItemCard from './components/ItemCard.vue';

// Estados de la aplicación
const vistaActual = ref('inicio'); // Navegación SPA
const items = ref([]);
const cargando = ref(false);
const error = ref(null);
const mensajeExito = ref('');

// Cargar datos al iniciar
const cargarDatos = async () => {
  cargando.value = true;
  error.value = null;
  try {
    const data = await apiService.getItems();
    if (data) {
      items.value = data;
    }
  } catch (err) {
    error.value = err.message || 'Error al conectar con la API.';
  } finally {
    cargando.value = false;
  }
};

// Manejar el evento del formulario
const manejarNuevoItem = async (nuevoItem) => {
  cargando.value = true;
  error.value = null;
  mensajeExito.value = '';
  try {
    const creado = await apiService.createItem(nuevoItem);
    creado.id = Date.now();
    items.value.unshift(creado);
    mensajeExito.value = '¡Registro agregado correctamente!';
    setTimeout(() => (mensajeExito.value = ''), 3000);
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  cargarDatos();
});
</script>

<template>
  <div class="contenedor">
    <header>
      <h1>Gestor SPA / PWA - Vue 3</h1>
      <nav>
        <button :class="{ activo: vistaActual === 'inicio' }" @click="vistaActual = 'inicio'">
          Listado y Registro
        </button>
        <button :class="{ activo: vistaActual === 'acerca' }" @click="vistaActual = 'acerca'">
          Info del Sistema
        </button>
      </nav>
    </header>

    <main v-if="vistaActual === 'inicio'">
      <ItemForm @agregar-item="manejarNuevoItem" />

      <div v-if="mensajeExito" class="alerta exito">{{ mensajeExito }}</div>

      <div v-if="error" class="alerta error">
        {{ error }}
        <button @click="cargarDatos" class="btn-reintentar">Reintentar</button>
      </div>

      <div v-if="cargando" class="estado">Cargando datos desde la API...</div>

      <div v-else-if="items.length === 0 && !error" class="estado">
        No hay registros disponibles. Agrega uno arriba.
      </div>

      <div v-else class="lista">
        <ItemCard v-for="item in items" :key="item.id" :item="item" />
      </div>
    </main>

    <main v-else class="info-box">
      <h2>Arquitectura PWA & SPA</h2>
      <p>Aplicación construida con Vue 3 Composition API, servicio HTTP centralizado y soporte offline.</p>
    </main>
  </div>
</template>

<style>
body {
  font-family: system-ui, sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 20px;
}
.contenedor {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
header {
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
nav {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
nav button {
  padding: 8px 14px;
  border: 1px solid #ddd;
  background: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
}
nav button.activo {
  background: #35495e;
  color: white;
  border-color: #35495e;
}
.alerta {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
}
.exito {
  background: #d4edda;
  color: #155724;
}
.error {
  background: #f8d7da;
  color: #721c24;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.estado {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>