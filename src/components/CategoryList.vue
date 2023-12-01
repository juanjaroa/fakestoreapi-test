<template>
  <div class="category-filter">
    <Dropdown
      v-model="categoryValue"
      :options="categories"
      :optionLabel="(option) => option"
      showClear
      placeholder="Select a Category"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";

import Dropdown from "primevue/dropdown";

const categories = ref([]);

const categoryValue = ref(null);

const emits = defineEmits(["update:categoryValue"]);

onMounted(async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );

    if (!response.ok) {
      throw new Error(
        `Error la lista de categorias de productos. Código de estado: ${response.status}`
      );
    }

    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error("Error la lista de categorias de productos:", error.message);
  }
});

watch(categoryValue, () => {
  emits("update:categoryValue", categoryValue.value);
});
</script>
<style scoped>
.category-filter {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
