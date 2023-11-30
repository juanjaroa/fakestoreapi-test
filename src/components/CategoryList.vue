<template>
  <div class="category-filter">
    <p>Filter by:</p>
    <SelectButton
      size="small"
      v-model="categoryValue"
      :options="categories"
      :optionLabel="(option) => option"
      aria-labelledby="basic"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import SelectButton from "primevue/selectbutton";

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
  } /* finally {
    loading.value = false;
  } */
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
  flex-wrap: wrap;
}
</style>
