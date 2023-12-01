<template>
  <div>
    <header>
      <h1>Products</h1>
      <CategoryList @update:categoryValue="handleCategoryUpdate" />
    </header>

    <div class="card">
      <DataTable
        :filters="filters"
        @update:filters="updateFilters"
        :value="products"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20]"
        :loading="loading"
        :globalFilterFields="['title', 'category']"
        size="large"
        stripedRows
      >
        <template #empty> No products found. </template>
        <template #loading> Loading products data. Please wait. </template>
        <Column
          field="title"
          header="Name"
          :filter="true"
          filterMatchMode="contains"
          style="max-width: 350px; min-width: 200px"
        ></Column>
        <Column
          header="Image"
          style="text-align: center"
          headerStyle="text-align: center"
        >
          <template #body="slotProps">
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.image"
              class="product-image"
            />
          </template>
        </Column>
        <Column field="category" header="Category"></Column>
        <Column field="price" header="Price">
          <template #body="slotProps">
            <span style="font-weight: 600; color: var(--highlight-text-color)"
              >${{ slotProps.data.price }}</span
            >
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <Button
              size="small"
              @click="addToCart(slotProps.data)"
              v-if="!isProductInCart(slotProps.data.id)"
              >Add to cart</Button
            >
            <div class="add-remove" v-else>
              <Button
                size="small"
                text
                severity="danger"
                @click="removeItem(slotProps.data.id)"
                icon="pi pi-minus"
              ></Button>
              <h4>{{ getCartItemQuantity(slotProps.data.id) }}</h4>
              <Button
                size="small"
                text
                @click="addToCart(slotProps.data)"
                icon="pi pi-plus"
              ></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import CategoryList from "./CategoryList.vue";

const props = defineProps(["filters", "cartProducts"]);

const products = ref([]);
const loading = ref(true);

const handleCategoryUpdate = (category) => {
  props.filters.category.value = category;
};

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
header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}
.p-datatable .product-image {
  height: 100px;
  aspect-ratio: 1/1;
  object-fit: contain;
}
button {
  width: max-content;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
