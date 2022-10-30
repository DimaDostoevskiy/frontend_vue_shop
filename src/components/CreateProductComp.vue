<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6 card bg-dark text-bg-dark">
        <div class="row m-3">
          <div class="col-4">
            <img :src="imageUrl" class="img w-100" alt="product image" />
          </div>

          <div class="col-8">
            <label for="newProductName" class="form-label">Product name</label>
            <input
              id="newProductName"
              type="text"
              class="form-control w-100"
              v-model="name"
              @change="checkInputs"
            />

            <label for="newProductPrice" class="form-label mt-2"
              >Product price</label
            >
            <input
              id="newProductPrice"
              type="text"
              class="form-control w-100"
              v-model="price"
              @change="checkInputs"
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
            class="text-center fs-5"
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
      name: "",
      price: "",
      productImage: null,
      imageUrl: null,
      infoMessage: "",
      hasError: false,
    };
  },
  methods: {
    checkName() {
      if (!isFinite(this.name) && this.name.length > 3) return true;
      this.hasError = true;
      this.infoMessage = "invalid product name";
      return false;
    },

    checkPrice() {
      this.price = (Math.floor(this.price * 100) / 100).toFixed(2);
      if (!isNaN(this.price) && this.price > 0) return true;
      this.hasError = true;
      this.infoMessage = "invalid product price";
      this.price = "";
      return false;
    },

    checkImage() {
      if (this.productImage !== null) return true;
      this.hasError = true;
      this.infoMessage = "load product image, pleace";
      return false;
    },

    onFilePicked(event) {
      const fileReader = new FileReader();
      const files = event.target.files;
      this.productImage = files[0];

      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
    },

    async addNewProduct() {
      if (!this.checkName() || !this.checkPrice() || !this.checkImage()) return;

      let fd = new FormData();
      fd.append("name", this.name);
      fd.append("price", this.price);
      fd.append("productImage", this.productImage);

      try {
        let response = await fetch(basicRoute + "products", {
          method: "POST",
          headers: {
            Authorization: `token ${this.token}`,
          },
          body: fd,
        });

        if (response.status === 201) {
          this.hasError = false;
          this.infoMessage = "product created";
        } else {
          this.hasError = true;
          this.infoMessage = "product not created";
        }
      } catch (error) {
        this.hasError = true;
        this.infoMessage = `Srver error: ${error}`;
      }
    },
  },
};
</script>

<style scoped>

</style>