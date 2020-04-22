var app = new Vue({
  el: "#app",
  data: {
    altText: "A pair of socks",
    brand: "Vue Mastery",
    product: "Socks",
    description: "A pair of warm fuzzy socks",
    selectedVariant: 0,
    link: "https://www.amazon.com/s?k=socks",
    details: ["80% cotton", "20% polester", "Gender-neutral"],
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
    cart: 0,
  },
  methods: {
    addToCart: function () {
      this.cart += 1;
    },
    updateProduct: function (idx) {
      this.selectedVariant = idx;
    },
    removeFromCart: function () {
      if (this.cart > 0) {
        this.cart -= 1;
      }
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
      if (this.onSale) {
        return this.brand + " " + this.product + " are on sale!";
      }
      return this.brand + " " + this.product + " are not on sale";
    },
  },
});
