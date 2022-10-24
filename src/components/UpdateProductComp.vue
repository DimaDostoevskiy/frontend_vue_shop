<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6 card bg-dark text-bg-dark">
        <div class="row m-3">
          <div class="col-4">
            <img
              v-if="isUpdateImage"
              :src="imageUrl"
              class="img"
              alt="product image"
            />
            <img
              v-else
              :src="`http://localhost:1111/${product.productImage}`"
              class="img"
              alt="product image"
            />
          </div>

          <div class="col-8">
            <label for="newProductName" class="form-label">Product name</label>
            <input
              id="newProductName"
              type="text"
              class="form-control w-100"
              v-model="product.name"
              @change="checkInputs"
            />

            <label for="newProductPrice" class="form-label mt-2"
              >Product price</label
            >
            <input
              id="newProductPrice"
              type="text"
              class="form-control w-100"
              v-model="product.price"
              @change="checkInputs"
            />

            <label for="file_input" class="btn btn-outline-light w-100 mt-4"
              >Load image</label
            >
            <input
              id="file_input"
              type="file"
              accept="image/*"
              style="display: none"
              @change="onFilePicked"
            />

            <button
              @click="update"
              class="btn btn-outline-light w-100 mt-4"
              type="button"
            >
              Update
            </button>
          </div>
        </div>
        <div class="row">
          <span
            class="text-center fs-4"
            :class="{ 'text-danger': hasError, 'text-success': !hasError }"
            >{{ infoMessage }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { basicRoute } from "@/config/config";

export default {
  name: "UpdateProductComp",
  props: ["token", "updateProduct"],
  data() {
    return {
      product: {
        name: "",
        price: "",
        productImage: "",
      },
      imageUrl: null,
      infoMessage: "",
      hasError: false,
      isUpdateImage: false,
    };
  },
  mounted() {
    this.product.name = this.updateProduct.name;
    this.product.price = this.updateProduct.price;
    this.product.productImage = this.updateProduct.productImage;
  },
  methods: {
    checkInputs() {
      return (
        this.product.name !== "" &&
        this.product.price > 0 &&
        this.product.productImage !== null
      );
    },
    update() {
      if (!this.checkInputs()) {
        this.infoMessage = "Error";
        this.hasError = true;
        return;
      }

      let fd = new FormData();
      fd.append("name", this.product.name);
      fd.append("price", this.product.price);
      fd.append("productimage", this.product.productImage);

      fetch(`${basicRoute}products/${this.updateProduct._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `token ${this.token}`,
        },
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.hasError = false;
          this.infoMessage = data.message;
        })
        .catch((error) => {
          console.log(error);
          this.hasError = true;
          this.infoMessage = error.message;
        });
    },

    onFilePicked(event) {
      this.isUpdateImage = true;
      const fileReader = new FileReader();
      const files = event.target.files;
      this.product.productImage = files[0];

      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>