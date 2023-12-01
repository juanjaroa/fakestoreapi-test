<template>
  <DataView :value="products">
    <template #empty>
      <div>
        <i class="pi pi-info-circle"></i>
        You haven't selected any products yet.
      </div>
    </template>
    <template #list="slotProps">
      <div class="cart-product-list">
        <div
          v-for="(product, index) in slotProps.items"
          :key="index"
          class="single-product-cart"
          :style="{
            'border-top': index !== 0 ? '1px solid rgba(0,0,0,0.1)' : 'none',
          }"
        >
          <div class="product-info">
            <img :src="product.product.image" :alt="product.product.title" />

            <div class="product-details" style="overflow: hidden; flex-grow: 1">
              <p class="truncate" :title="product.product.title">
                {{ product.product.title }}
              </p>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600"
                  >${{
                    product.product.price *
                    getCartItemQuantity(product.product.id)
                  }}</span
                >
                <div class="add-remove">
                  <Button
                    size="small"
                    text
                    severity="danger"
                    @click="removeItem(product.product.id)"
                    icon="pi pi-minus"
                  ></Button>
                  <h4>{{ getCartItemQuantity(product.product.id) }}</h4>
                  <Button
                    size="small"
                    text
                    @click="addToCart(product.product)"
                    icon="pi pi-plus"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
  <div style="margin-top: 2rem" v-show="subtotal !== 0">
    <div class="subtotal">
      <span>Subtotal:</span>
      <span>${{ subtotal.toFixed(2) }}</span>
    </div>
    <div class="shipping">
      <span>Shipping:</span>
      <span>${{ shipping }}</span>
    </div>
    <div class="total">
      <h3>Total:</h3>
      <h3 v-show="calculateTotal !== 0">${{ calculateTotal.toFixed(2) }}</h3>
    </div>
  </div>
</template>

<script setup>
import DataView from "primevue/dataview";
import Button from "primevue/button";
import { computed } from "vue";

const props = defineProps(["products"]);

const shipping = 10;

const subtotal = computed(() => {
  return props.products.reduce((acc, currentProduct) => {
    const {
      items,
      product: { price },
    } = currentProduct;
    return acc + items * price;
  }, 0);
});

const calculateTotal = computed(() => {
  return subtotal.value + shipping;
});

const emits = defineEmits(["add-product", "remove-item"]);

const addToCart = (product) => {
  emits("add-product", product);
};

const removeItem = (productId) => {
  emits("remove-item", productId);
};

const getCartItemQuantity = (productId) => {
  const cartItem = props.products.find((item) => item.product.id === productId);
  return cartItem ? cartItem.items : 0;
};
</script>
<style scoped>
.cart-product-list {
  display: flex;
  flex-direction: column;
}
.single-product-cart {
  padding: 1rem 0;
}
.product-info {
  display: flex;
  align-items: center;
  overflow: hidden;
}
img {
  width: 4rem;
  aspect-ratio: 4/3;
  object-fit: contain;
}
.card {
  border: none;
}
button {
  width: max-content;
}
.subtotal,
.shipping,
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-remove {
  padding: 0.25rem;
}
</style>
