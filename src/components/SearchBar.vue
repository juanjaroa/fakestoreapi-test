<template>
  <span class="p-input-icon-right">
    <i class="pi pi-search"></i>
    <InputText
      v-model="searchTerm"
      @input="updateSearch"
      placeholder="Search products..."
    />
  </span>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";

const emits = defineEmits(["search"]);

const searchTerm = ref("");

const updateSearch = () => {
  emits("search", searchTerm);
};
</script>

<style scoped>
input {
  width: 50vw;
  min-width: 200px;
  max-width: 500px;
}
</style>
