<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="card" :class="{ completado: item.completed }">
    <span>{{ item.title }}</span>
    <span class="badge">{{ item.completed ? 'Completado' : 'Pendiente' }}</span>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 10px;
  background: #f9f9f9;
  border-left: 5px solid #35495e;
  border-radius: 6px;
}
.completado {
  border-left-color: #42b883;
  opacity: 0.8;
}
.badge {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
  background: #e2e8f0;
}
</style>