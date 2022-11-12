<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6 card bg-dark text-bg-dark">
        <div class="row m-3">
          <!-- / Product image / -->
          <div class="col-4">
            <img
              :src="product.imageUrl"
              class="img w-100"
              alt="product image"
            />
          </div>
          <div class="col-8">
            <!-- / Product name / -->
            <label for="newProductName" class="form-label">Product name</label>
            <input
              id="newProductName"
              type="text"
              class="form-control w-100"
              v-model="product.name"
            />
            <!-- / Product price / -->
            <label for="newProductPrice" class="form-label mt-2"
              >Product price</label
            >
            <input
              id="newProductPrice"
              type="text"
              class="form-control w-100"
              v-model="product.price"
            />
            <!-- / Button 'Load image' / -->
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
            <!-- / Button 'Add new produc' / -->
            <button
              @click="addNewProduct"
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

<script setup>
import { basicRoute } from "@/config/config";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";

const route = useRouter();
const store = useStore();

const product = ref({
  name: null,
  price: null,
  imageUrl: null,
  productImage: null,
});
const onFilePicked = (event) => {
  const fileReader = new FileReader();
  const files = event.target.files;
  product.value.productImage = files[0];

  fileReader.addEventListener("load", () => {
    product.value.imageUrl = fileReader.result;
  });

  fileReader.readAsDataURL(files[0]);
};
const addNewProduct = async () => {
  if (
    !product.value.name ||
    !product.value.productImage ||
    product.value.price < 0
  )
    return;

  const fd = new FormData();
  fd.append("name", product.value.name);
  fd.append("price", product.value.price);
  fd.append("productImage", product.value.productImage);

  try {
    const response = await fetch(`${basicRoute}products`, {
      method: "POST",
      headers: {
        Authorization: `token ${store.state.token}`,
      },
      body: fd,
    });
    if (response.ok) route.push("/main");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
