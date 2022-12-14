<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="card col-10 col-md-8 col-xl-6 bg-dark text-bg-dark">
        <div class="row m-3">
          <div class="col-4">
            <img
              :src="productImageUrl"
              class="img product-img"
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
            />

            <label for="newProductPrice" class="form-label mt-2"
              >Product price</label
            >
            <input
              id="newProductPrice"
              type="text"
              class="form-control w-100"
              v-model="product.price"
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
              type="button"
              class="btn btn-outline-light w-100 mt-4"
              @click="update"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { basicRoute } from "@/config/config";
import { useStore } from "vuex";

import { showToast } from "@/helpers/toast";

const route = useRoute();
const store = useStore();
const router = useRouter();

const dataUrlImg = ref("");

const product = ref({
  name: null,
  price: null,
  productImage: null,
});

const productImageUrl = computed(() => {
  return dataUrlImg.value
    ? dataUrlImg.value
    : `${basicRoute}${product.value.productImage}`;
});

onMounted(async () => {
  const response = await fetch(`${basicRoute}products/${route.params.id}`).then(
    (data) => data
  );
  const productData = await response.json();
  product.value = productData.product;
});

const onFilePicked = (event) => {
  const fileReader = new FileReader();
  const files = event.target.files;

  product.value.productImage = files[0];

  fileReader.addEventListener("load", () => {
    dataUrlImg.value = fileReader.result;
  });

  fileReader.readAsDataURL(files[0]);
};

const update = async () => {
  const fd = new FormData();
  fd.append("name", product.value.name);
  fd.append("price", product.value.price);
  fd.append("productImage", product.value.productImage);

  try {
    const response = await fetch(`${basicRoute}products/${route.params.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${store.state.token}`,
      },
      body: fd,
    });

    if (response.ok) {
      showToast("product updated");
      router.push("/main");
    } else {
      showToast("product not updated", "wk-warn");
    }
  } catch (err) {
    router.push("/main");
    console.log(err);
  }
};
</script>

<style scoped>
.product-img {
  width: 100%;
}
</style>
