Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `,
});
Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" :alt="altText" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p v-if="onSale">{{ sale }}</p>
        <p>Shipping: {{ shipping }}</p>
        <a :href="link" target="_blank">More products like this</a>

        <product-details :details="details"></product-details>

        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          class="color-box"
          :style="{backgroundColor: variant.color}"
          @mouseover="updateProduct(index)"
        ></div>
        <p v-if="sizes.length > 0">Sizes</p>
        <ul>
          <li v-for="size in sizes">{{size}}</li>
        </ul>
        <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">
          Add to Cart
        </button>
        <button @click="removeFromCart">Remove from Cart</button>
        
      </div>
    </div>
  `,
  data() {
    return {
      altText: "A pair of socks",
      brand: "Vue Mastery",
      product: "Socks",
      details: ["80% cotton", "20% polester", "Gender-neutral"],
      description: "A pair of warm fuzzy socks",
      selectedVariant: 0,
      link: "https://www.amazon.com/s?k=socks",
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/vmSocks-green.jpg",
          quantity: 10,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/vmSocks-blue.jpg",
          quantity: 0,
        },
      ],
      onSale: true,
      sizes: ["xs", "s", "m", "l", "xl", "xxl"],
    };
  },
  methods: {
    addToCart: function () {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeFromCart: function () {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    updateProduct: function (idx) {
      this.selectedVariant = idx;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    sale() {
      const saleStatus = this.onSale ? " are on sale!" : "are not on sale";
      return this.brand + " " + this.product + saleStatus;
    },
    shipping() {
      return this.premium ? "Free" : "2.99";
    },
  },
});

var app = new Vue({
  el: "#app",
  data: {
    cart: [],
    premium: true,
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeCart(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    },
  },
});
