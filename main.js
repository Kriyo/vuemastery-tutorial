var eventBus = new Vue();

Vue.component("add-info-tabs", {
  props: {
    shipping: {
      type: String,
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>
      <ul>
        <span class="tabs" 
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              @click="selectedTab = tab"
              :key="tab"
        >{{ tab }}</span>
      </ul>

      <div v-show="selectedTab === 'Shipping'">
        <p>{{ shipping }}</p>
      </div>

      <div v-show="selectedTab === 'Details'">
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
      </div>
  
    </div>
  `,
  data() {
    return {
      tabs: ["Shipping", "Details"],
      selectedTab: "Shipping",
    };
  },
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>
      <span class='tab'
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs"
            :key='index'
            @click='selectedTab = tab'>
              {{ tab }}
            </span>

      <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <ul v-if="reviews.length >= 1">
          <li v-for='review in reviews'>
            <p>Name: {{ review.name }}</p>
            <p>Review: {{ review.review }}</p>
            <p>Rating: {{ review.rating }} / 5</p>
            <p>Recommend: {{ review.recommend }}</p>
          </li>
        </ul>
          <p v-else>There are no reviews yet.</p>
        </div>

        <product-review v-show="selectedTab === 'Make a Review'"></product-review>
    </div>
  `,
  data() {
    return {
      selectedTab: "Reviews",
      tabs: ["Reviews", "Make a Review"],
    };
  },
});

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for='error in errors'>{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>Would you recommend this product?</p>      

      <label for="Yes">Yes
        <input type="radio"value="Yes" v-model=recommend>
      </label>

      <label for="No">No
        <input type="radio" value="No" v-model=recommend>
      </label>
          
      <p>
        <input type="submit" value="Submit">  
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          rating: this.rating,
          review: this.review,
          recommend: this.recommend,
        };
        this.name = null;
        this.rating = null;
        this.review = null;
        this.recommend = null;
        eventBus.$emit("review-submit", productReview);
      } else {
        if (!this.name) this.errors.push("Name is required");
        if (!this.review) this.errors.push("Review is required");
        if (!this.rating) this.errors.push("Rating is required");
        if (!this.recommend) this.errors.push("Recommend is required");
      }
    },
  },
});
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
        
        <add-info-tabs :shipping="shipping" :details="details"></add-info-tabs>
 
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
      <product-tabs :reviews="reviews"></product-tabs>
      
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
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    updateProduct(idx) {
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
  mounted() {
    eventBus.$on("review-submit", (productReview) => {
      this.reviews.push(productReview);
    });
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
