<template>
  <Menubar>
    <template #start>
      <i
        class="pi pi-prime"
        style="font-size: 2rem; color: var(--highlight-text-color)"
      ></i>
      <SearchBar @search="handleSearch" />
    </template>
    <template #end>
      <Button
        icon="pi pi-shopping-cart"
        :badge="cartProducts.length > 0 ? cartProducts.length.toString() : null"
        @click="showSidebar = true"
        class="cart"
      ></Button>
    </template>
  </Menubar>
  <div class="container">
    <ProductList
      :filters="filters"
      :cartProducts="cartProducts"
      @add-product="handleAddCart"
      @remove-item="handleRemoveItem"
    />
  </div>
  <Sidebar
    v-model:visible="showSidebar"
    header="Cart items"
    position="right"
    blockScroll
  >
    <ShoppingCart
      :products="cartProducts"
      @add-product="handleAddCart"
      @remove-item="handleRemoveItem"
    />
  </Sidebar>
</template>

<script setup>
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";

import Menubar from "primevue/menubar";
import SearchBar from "./components/SearchBar.vue";
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  category: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const showSidebar = ref(false);

const handleSearch = (searchTerm) => {
  filters.value.global.value = searchTerm;
};

const CART_PRODUCTS_KEY = "cartProducts";

const cartProducts = ref(
  JSON.parse(sessionStorage.getItem(CART_PRODUCTS_KEY)) || []
);

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

  sessionStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(cartProducts.value));
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

  sessionStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(cartProducts.value));
};
</script>

<style scoped></style>
