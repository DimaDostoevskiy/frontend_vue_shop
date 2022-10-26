<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div
          class="col-lg-3 col-md-4 col-sm-12"
          v-for="item in productList"
          :key="item.id"
        >
          <div class="card m-2 bg-dark text-bg-dark">
            <img
              :src="`http://localhost:1111/${item.productImage}`"
              class="card-img-top"
              alt="product image"
            />
            <div class="card-body">
              <h6 class="card-title">{{ `delicious ${item.name}` }}</h6>
              <p class="card-text">{{ `₽ ${item.price}` }}</p>

              <button
                type="button"
                class="btn btn-outline-info btn-sm w-100 mt-2"
                @click="newOrderProductId = item._id"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Buy
              </button>

              <button
                type="button"
                class="btn btn-outline-success btn-sm w-100 mt-2"
                @click="updateProduct(item)"
              >
                Update
              </button>

              <button
                type="button"
                class="btn btn-outline-danger btn-sm w-100 mt-2"
                @click="deleteProduct(item._id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body bg-dark text-bg-dark">
            <button
              type="button"
              class="btn-close btn-close-white float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="newOrderProductId = null"
            ></button>

            <div class="row mt-5">
              <div class="col-4">
                <label for="quantity">Quantity:</label>
              </div>
              <div class="col-8">
                <input
                  type="text"
                  class="form-control"
                  name="quantity"
                  id="quantity"
                  v-model="newOrderQuantity"
                />
              </div>
            </div>
            <div class="row mt-5">
              <button
                type="button"
                class="btn btn-outline-info mt-2 float-end"
                @click="createOrder"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                make order
              </button>
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
  data() {
    return {
      productList: [],
      errorMessage: "",
      hasError: false,
      newOrderProductId: null,
      newOrderQuantity: 0,
    };
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    createOrder() {
      const orderBody = JSON.stringify({
        productId: this.newOrderProductId,
        quantity: parseInt(this.newOrderQuantity),
      });
      this.newOrderQuantity = 0;
      fetch(`${basicRoute}orders`, {
        method: "POST",
        headers: {
          Authorization: `token ${this.token}`,
          "Content-Type": 'application/json'
        },
        body: orderBody,
      })
        .then((response) => {
          this.hasError = false;
          console.log(response);
        })
        .catch((error) => {
          this.hasError = true;
          this.errorMessage = `Server error: ${error}`;
          console.log(`Error: ${error}`);
        });
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