<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6 card bg-dark text-bg-dark">
        <div class="row m-3">
          <div class="col-4">
            <img
              :src="imageUrl"
              class="img"
              alt="product image"
            />
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
              :disabled="!isCheckInputs"
              class="btn btn-outline-light w-100 mt-4"
              type="button"
            >
              Add new product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<!-- <template>
  <div class="container bg-dark">
    <img :src="imageUrl" width="100" height="100" />

    <input @change="checkInputs" v-model="newProduct.name" type="text" />
    <input @change="checkInputs" v-model="newProduct.price" type="text" />

    <label for="file_input" class="btn btn-outline-light">Load image</label>
    <input
      @change="onFilePicked"
      id="file_input"
      type="file"
      style="display: none"
      accept="image/*"
    />

    <button
      @click="addNewProduct"
      class="btn btn-outline-light"
      type="button"
      :disabled="!isCheckInputs"
    >
      Add new product
    </button>
  </div>
</template> -->

<script>
import { basicRoute } from "@/config/config";

export default {
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
      isCheckInputs: false,
    };
  },
  methods: {
    checkInputs() {
      console.log(this.newProduct.name);
      this.isCheckInputs = this.newProduct.name === "ad";
    },

    onFilePicked(e) {
      const fileReader = new FileReader();
      const files = e.target.files;

      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
        this.productImage = files[0];
      });

      fileReader.readAsDataURL(files[0]);
    },

    async addNewProduct() {
      try {
        let response = await fetch(basicRoute + "products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(this.newProduct),
        });

        if (response.ok) {
          this.infoMessage = `Product ${this.newProduct.name} added`;
        } else {
          this.infoMessage = "Srver error";
        }
      } catch (error) {
        this.infoMessage = `Srver error: ${error}`;
      }
    },
  },
};
</script>

<style scoped>
img{
  background-color: green;
  height: 100%;
  width: 100%;
}
</style>