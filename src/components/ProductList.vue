<template>
  <div>
    <h2>Productos</h2>
    <p>Aquí se muestran todos los productos disponibles:</p>

    <!-- Mostrar la lista de productos usando PrimeVue's DataTable -->
    <DataTable
      :value="products"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
    >
      <!-- Definir las columnas del DataTable -->
      <!-- <Column field="id" header="ID"></Column> -->
      <Column field="title" header="Título"></Column>
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
      <Column field="category" header="Caategory"></Column>
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
/* import InputText from "primevue/inputtext"; */

// Definir el estado local para la lista de productos
const products = ref([]);

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
  }
});
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
.p-datatable .product-image {
  width: 6rem;
}
</style>
