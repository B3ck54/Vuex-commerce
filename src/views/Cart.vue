<template>
  <div>
    <h1>Cart</h1>
    <div v-if="cart">
      <div class="product" v-for="product in cart.products" :key="product.id">
        <i
          class="far fa-plus-square fa-lg"
          @click="incrementQuantity(product)"
        ></i>
        <i
          class="far fa-minus-square fa-lg"
          @click="decrementQuantity(product)"
        ></i>
        <span class="quantity">{{ product.quantity }}</span>
        {{ product.title }} - {{ product.price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.getCart;
    }
  },
  methods: {
    incrementQuantity(product) {
      this.$store.dispatch("updateCart", product);
    },
    decrementQuantity(product) {
      this.$store.dispatch("removeOneFromCart", product);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
