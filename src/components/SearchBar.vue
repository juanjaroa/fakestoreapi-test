<template>
  <div>
    <h2>Barra de Búsqueda</h2>

    <span class="p-input-icon-right">
      <i class="pi pi-search"></i>
      <InputText
        v-model="searchTerm"
        @input="updateSearch"
        placeholder="Buscar productos"
      />
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";

const emits = defineEmits(["search"]);

// Estado local para el término de búsqueda
const searchTerm = ref("");

// Función para actualizar la búsqueda y emitir el evento
const updateSearch = () => {
  emits("search", searchTerm);
};
</script>

<style scoped></style>
