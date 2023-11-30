<template>
  <div class="sections">
    <Button icon="pi pi-arrow-left" @click="showSidebar = true"></Button>
    <SearchBar @search="handleSearch" />
    <CategoryList @update:categoryValue="handleCategoryUpdate" />
    <ProductList
      :filters="filters"
      :cartProducts="cartProducts"
      @add-product="handleAddCart"
      @remove-item="handleRemoveItem"
    />
    <Sidebar v-model:visible="showSidebar" header="Cart items" position="right">
      <ShoppingCart :products="cartProducts" @remove-item="handleRemoveItem" />
    </Sidebar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { FilterMatchMode } from "primevue/api";

import SearchBar from "./components/SearchBar.vue";
import CategoryList from "./components/CategoryList.vue";
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";

import Sidebar from "primevue/sidebar";
import Button from "primevue/button";

// Define los filtros en App.vue
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  category: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const showSidebar = ref(false);

const handleSearch = (searchTerm) => {
  // Actualizar el filtro global con el término de búsqueda
  filters.value.global.value = searchTerm;
};

const handleCategoryUpdate = (category) => {
  filters.value.category.value = category;
};

const cartProducts = ref([]);

const handleAddCart = (product) => {
  // Buscar si el producto ya está en el carrito
  const existingProduct = cartProducts.value.find(
    (item) => item.product.id === product.id
  );

  if (existingProduct) {
    // Si el producto ya está en el carrito, incrementar el contador de items
    existingProduct.items++;
  } else {
    // Si el producto no está en el carrito, agregarlo con items = 1
    cartProducts.value = [...cartProducts.value, { product, items: 1 }];
  }
};

const handleRemoveItem = (productId) => {
  // Encontrar el índice del producto en el carrito
  const index = cartProducts.value.findIndex(
    (item) => item.product.id === productId
  );

  if (index !== -1) {
    // Restarle 1 a items
    cartProducts.value[index].items--;

    // Si items es igual a 0, eliminar el producto del carrito
    if (cartProducts.value[index].items === 0) {
      cartProducts.value.splice(index, 1);
    }
  }
};

watch(
  cartProducts,
  () => {
    console.log(cartProducts.value);
  },
  { deep: true }
);
</script>

<style scoped>
.sections {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}
</style>
