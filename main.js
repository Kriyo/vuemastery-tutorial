var app = new Vue({
  el: "#app",
  data: {
    altText: "A pair of socks",
    product: "Socks",
    description: "A pair of warm fuzzy socks",
    image: "./assets/vmSocks-green.png",
    link: "https://www.amazon.com/s?k=socks",
    inStock: false,
    onSale: true,
    details: ["80% cotton", "20% polester", "Gender-neutral"],
    variants: [
      {
        id: 2234,
        color: "green",
        image: "./assets/vmSocks-green.png",
      },
      {
        id: 2235,
        color: "blue",
        image: "./assets/vmSocks-blue.jpg",
      },
    ],
    sizes: ["xs", "s", "m", "l", "xl", "xxl"],
    cart: 0,
  },
  methods: {
    addToCart: function () {
      this.cart += 1;
    },
    updateProduct: function (img) {
      this.image = img;
    },
    removeFromCart: function () {
      if (this.cart > 0) {
        this.cart -= 1;
      }
    },
  },
});
