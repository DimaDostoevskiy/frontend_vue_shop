<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6 card bg-dark text-bg-dark">
        <div class="row m-3">
          <div class="col-4">
            <img :src="imageUrl" class="img" alt="product image" />
          </div>

          <div class="col-8">
            <label for="newProductName" class="form-label">Product name</label>
            <input
              id="newProductName"
              @change="checkInputs"
              v-model="newProduct.name"
              type="text"
              class="form-control w-100"
            />

            <label for="newProductPrice" class="form-label mt-2"
              >Product price</label
            >
            <input
              id="newProductPrice"
              @change="checkInputs"
              v-model="newProduct.price"
              type="text"
              class="form-control w-100"
            />

            <label for="file_input" class="btn btn-outline-light w-100 mt-4"
              >Load image</label
            >
            <input
              @change="onFilePicked"
              id="file_input"
              type="file"
              style="display: none"
              accept="image/*"
            />

            <button
              @click="addNewProduct"
              class="btn btn-outline-light w-100 mt-4"
              type="button"
            >
              Add new product
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
  props: ["token"],
  name: "CreateProductComp",
  data() {
    return {
      newProduct: {
        name: "",
        price: "",
        productImage: null,
      },
      imageUrl: null,
      infoMessage: "",
      hasError: false,
    };
  },
  methods: {
    checkInputs() {
      return (
        this.newProduct.name !== "" &&
        this.newProduct.price > 0 &&
        this.newProduct.productImage !== null
      );
    },

    onFilePicked(event) {
      const fileReader = new FileReader();
      const files = event.target.files;
      this.newProduct.productImage = files[0];

      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
    },

    async addNewProduct() {
      if (!this.checkInputs()) {
        this.infoMessage = "Error";
        this.hasError = true;
        return;
      }

      let fd = new FormData();
      fd.append("name", this.newProduct.name);
      fd.append("price", this.newProduct.price);
      fd.append("productImage", this.newProduct.productImage);

      try {
        let response = await fetch(basicRoute + "products", {
          method: "POST",
          headers: {
            Authorization: `token ${this.token}`,
          },
          body: fd,
        });

        const resultMessage = await response.json();
        this.infoMessage = `${resultMessage.message}`;
        this.hasError = !response.ok;
      } catch (error) {
        this.infoMessage = `Srver error: ${error}`;
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>