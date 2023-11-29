<template>
  <div>
    <h2>Productos</h2>
    <p>Aquí se muestran todos los productos disponibles:</p>

    <!-- Mostrar la lista de productos usando PrimeVue's DataTable -->
    <DataTable
      v-model:filters="filters"
      :value="products"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      filterDisplay="menu"
      :loading="loading"
      :globalFilterFields="['title']"
    >
      <template #header>
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
      </template>
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
        <template #body="rowData">
          <Button @click="addToCart(rowData)">Agregar al Carrito</Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "primevue/api";

// Definir el estado local para la lista de productos
const products = ref([]);

// Definir el estado local para los filtros
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Definir el estado local para la propiedad loading
const loading = ref(true);

// Función para agregar un producto al carrito
const addToCart = (product) => {
  // Lógica para agregar el producto al carrito (puedes implementar esto según tus necesidades)
  console.log("Producto agregado al carrito:", product);
};

// Llamada a la API para obtener la lista de productos
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
    // Establecer loading en false después de que se complete la carga
    loading.value = false;
  }
});

// Función para limpiar los filtros
const clearFilter = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
.p-datatable .product-image {
  width: 6rem;
}
</style>
