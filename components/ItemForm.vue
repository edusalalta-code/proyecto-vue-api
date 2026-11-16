<script setup>
import { ref } from 'vue';

const emit = defineEmits(['agregar-item']);
const titulo = ref('');

const enviarFormulario = () => {
  if (!titulo.value.trim()) return;

  emit('agregar-item', {
    title: titulo.value.trim(),
    completed: false,
    userId: 1
  });

  titulo.value = '';
};
</script>

<template>
  <form @submit.prevent="enviarFormulario" class="formulario">
    <input
      v-model="titulo"
      type="text"
      placeholder="Escribe una nueva tarea o registro..."
      required
    />
    <button type="submit">Guardar</button>
  </form>
</template>

<style scoped>
.formulario {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  padding: 10px 18px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #33a06f;
}
</style>