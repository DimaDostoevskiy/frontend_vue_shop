<template>
  <div class="back">
    <div class="container mt-4">
      <div class="row">
        <div class="col-3" v-for="item in productList" :key="item.id">
          <div class="card m-2 bg-dark text-bg-dark">
            <img
              :src="`http://localhost:1111/${item.productImage}`"
              class="card-img-top"
              alt="product image"
            />
            <div class="card-body">
              <h6 class="card-title">{{ `delicious ${item.name}` }}</h6>
              <p class="card-text">{{ `₽ ${item.price}` }}</p>
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-outline-info btn-sm w-100"
                    @click="buy(item)"
                  >
                    Buy
                  </button>
                </div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm w-100"
                    @click="updateProduct(item)"
                  >
                    Update
                  </button>
                </div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm w-100"
                    @click="deleteProduct(item._id)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
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
    buy(product){
      console.log(product);
    },

    deleteProduct(id) {
      fetch(`${basicRoute}products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `token ${this.token}`,
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          this.hasError = true;
          this.errorMessage = `Server error: ${error}`;
          console.log(`Error: ${error}`);
        });
    },

    updateProduct(updateProduct) {
      this.$emit("showUpdateProduct", updateProduct);
    },

    getAllProducts() {
      fetch(`${basicRoute}products`)
        .then((response) => response.json())
        .then((data) => {
          this.productList = data.products;
        })
        .catch((error) => {
          this.hasError = true;
          this.errorMessage = `Server error: ${error}`;
          console.log(`Error: ${error}`);
        });
    },
  },
};
</script>

<style scoped>
.back {
  background-color: rgba(42, 42, 42, 1);
  width: 100%;
  min-height: 100%;
}
</style>