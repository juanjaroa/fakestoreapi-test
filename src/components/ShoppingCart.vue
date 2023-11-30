<template>
  <div class="card">
    <DataView :value="products">
      <template #empty>
        <!-- Tu contenido personalizado para cuando el DataView está vacío -->
        <div class="custom-empty-message">
          <i class="pi pi-info-circle"></i>
          Aun no se han añadido product al carrito
        </div>
      </template>
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div
            v-for="(product, index) in slotProps.items"
            :key="index"
            class="col-12"
          >
            <div
              class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <img
                class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                :src="product.product.image"
                :alt="product.product.title"
              />
              <div
                class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
              >
                <div
                  class="flex flex-column align-items-center sm:align-items-start gap-3"
                >
                  <div class="text-2xl font-bold text-900">
                    {{ product.product.title }}
                  </div>

                  <div class="flex align-items-center gap-3">
                    <span class="flex align-items-center gap-2">
                      <i class="pi pi-tag"></i>
                      <span class="font-semibold">{{
                        product.product.category
                      }}</span>
                    </span>
                  </div>
                </div>
                <div
                  class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                >
                  <span class="text-2xl font-semibold"
                    >${{ product.product.price }}</span
                  >
                </div>
              </div>
            </div>
            <Button @click="removeItem(product.product.id)">remove</Button>
          </div>
        </div>
      </template>
    </DataView>
    <h3 v-show="calculateTotal !== 0">{{ calculateTotal }}</h3>
  </div>
</template>

<script setup>
import DataView from "primevue/dataview";
import Button from "primevue/button";

/* import Button from "primevue/button"; */
import { computed } from "vue";

const props = defineProps(["products"]);

const calculateTotal = computed(() => {
  /* return products.value.reduce((total, item) => total + itemTotal(item), 0); */

  return props.products.reduce((acc, currentProduct) => {
    const {
      items,
      product: { price },
    } = currentProduct;
    return acc + items * price;
  }, 0);
});

const emits = defineEmits(["remove-item"]);

const removeItem = (productId) => {
  emits("remove-item", productId);
};
</script>
<style scoped>
img {
  width: 4rem;
  aspect-ratio: 4/3;
  object-fit: cover;
}
</style>
