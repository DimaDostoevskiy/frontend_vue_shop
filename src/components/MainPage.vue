<template>
  <div>
    <!-- Main Page -->
    <div class="container-fluid pt-4">
      <div class="container">
        <div class="row">
          <!-- / Products  / -->
          <div
            class="col-lg-3 col-md-4 col-sm-12"
            v-for="item in productList"
            :key="item.id"
          >
            <div class="card m-2 bg-dark text-bg-dark">
              <!-- / Product image / -->
              <img
                :src="`${basicRoute}${item.productImage}`"
                class="card-img-top"
                alt="product image"
              />
              <div class="card-body">
                <!-- / Product name / -->
                <h6 class="card-title">{{ `delicious ${item.name}` }}</h6>
                <!-- / Product price / -->
                <p class="card-text">{{ `₽ ${item.price}` }}</p>
                <!-- / Button 'Buy' / -->
                <button
                  type="button"
                  class="btn btn-outline-info btn-sm w-100 mt-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="newOrderProductId = item._id"
                >
                  Buy
                </button>
                <!-- / Button 'Update' / -->
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm w-100 mt-2"
                  @click="updateProduct(item)"
                >
                  Update
                </button>
                <!-- / Button 'Delete' / -->
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm w-100 mt-2"
                  @click="deleteProduct(item)"
                >
                  Delete
                </button>
              </div>
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
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="createOrder"
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

<script setup>
import { basicRoute } from "@/config/config";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const productList = ref([]);

onMounted(() => {
  getAllProducts();
});

const getAllProducts = async () => {
  try {
    const response = await fetch(`${basicRoute}products`);
    const result = await response.json();
    productList.value = result.products;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const deleteProduct = (product) => {
  fetch(`${basicRoute}products/${product._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `token ${store.state.token}`,
    },
  })
    .then(() => {
      productList.value.splice(productList.value.indexOf(product), 1);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

// createOrder() {
//   const orderBody = JSON.stringify({
//     productId: this.newOrderProductId,
//     quantity: parseInt(this.newOrderQuantity),
//   });
//   this.newOrderQuantity = 0;
//   fetch(`${basicRoute}orders`, {
//     method: "POST",
//     headers: {
//       Authorization: `token ${store.state.token}`,
//       "Content-Type": "application/json",
//     },
//     body: orderBody,
//   })
//     .then((response) => {
//       this.hasError = false;
//       console.log(response);
//     })
//     .catch((error) => {
//       this.hasError = true;
//       this.errorMessage = `Server error: ${error}`;
//       console.log(`Error: ${error}`);
//     });
// },

// updateProduct(product) {
//   this.$emit("showUpdateProduct", product);
// },
</script>

<style scoped></style>
