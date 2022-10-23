<template>
  <div class="container">
    <div class="row">
      <div class="col-4" v-for="item in productList" :key="item.id">
        <div class="card m-2 bg-dark text-bg-dark">
          <img
            :src="`http://localhost:1111/${item.productImage}`"
            class="card-img-top"
            alt="product image"
          />
          <div class="card-body">
            <h5 class="card-title">
              Prod name : {{ item.name }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { basicRoute } from "@/config/config";

export default {
  name: "MainComp",
  props: ["token"],
  components: {},
  data() {
    return {
      productList: [],
      errorMessage: "",
      hasError: false,
    };
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      fetch(`${basicRoute}products`)
        .then((response) => response.json())
        .then((data) => {
          this.productList = data.products;
        })
        .catch((error) => {
          this.hasError = true;
          this.errorMessage = "Server error";
          console.log(`Error: ${error}`);
        });
    },
  },
};
</script>