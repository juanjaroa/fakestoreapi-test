<template>
  <div>
    <h2>Productos</h2>
    <p>Aquí se muestran todos los productos disponibles:</p>

    <!-- Mostrar la lista de productos usando PrimeVue's DataTable -->
    <DataTable
      :filters="filters"
      @update:filters="updateFilters"
      :value="products"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      :loading="loading"
      :globalFilterFields="['title', 'category']"
    >
      <!-- <template #header>
        <div class="flex justify-content-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="clearFilter()"
          ></Button>
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template> -->
      <template #empty> No products found. </template>
      <template #loading> Loading products data. Please wait. </template>
      <Column
        field="title"
        header="Título"
        :filter="true"
        filterMatchMode="contains"
      ></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.image"
            class="product-image"
          />
        </template>
      </Column>
      <Column field="price" header="Precio"></Column>
      <Column field="category" header="Categoría"></Column>
      <Column header="Acciones">
        <template #body="slotProps">
          <Button
            @click="addToCart(slotProps.data)"
            v-if="!isProductInCart(slotProps.data.id)"
            >Add to cart</Button
          >
          <div v-else>
            <Button
              @click="removeItem(slotProps.data.id)"
              icon="pi pi-minus"
            ></Button>
            <span>{{ getCartItemQuantity(slotProps.data.id) }}</span>
            <Button
              @click="addToCart(slotProps.data)"
              icon="pi pi-plus"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
/* import Skeleton from "primevue/skeleton"; */
/* import InputText from "primevue/inputtext"; */
/* import { FilterMatchMode } from "primevue/api"; */

// Recibe los filtros como prop
const props = defineProps(["filters", "cartProducts"]);

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error(
        `Error al obtener datos de la API. Código de estado: ${response.status}`
      );
    }

    const data = await response.json();
    products.value = data;
  } catch (error) {
    console.error("Error al obtener datos de la API:", error.message);
  } finally {
    loading.value = false;
  }
});

const updateFilters = (value) => {
  // Emitir el evento update:filters al cambiar los filtros
  props.emit("update:filters", value);
};

const emits = defineEmits(["add-product", "remove-item"]);

const addToCart = (product) => {
  emits("add-product", product);
};

const removeItem = (productId) => {
  emits("remove-item", productId);
};

const isProductInCart = (productId) => {
  return props.cartProducts.some((item) => item.product.id === productId);
};

const getCartItemQuantity = (productId) => {
  const cartItem = props.cartProducts.find(
    (item) => item.product.id === productId
  );
  return cartItem ? cartItem.items : 0;
};
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
.p-datatable .product-image {
  width: 6rem;
}
</style>
