<template>
  <div class="container">
    <img :src="imageUrl" width="100" height="100" />

    <input v-model="name" @change="onChange" type="text" />
    <input @change="onChange" type="text" v-model="price" />

    <input
      @change="onFilePicked"
      ref="input"
      type="file"
      style="display: none"
      accept="image/*"
    />
    <button @click="onPickFile" class="btn btn-outline-light" type="button">
      Load image
    </button>
  </div>
</template>

<script>
export default {
  name: "CreateProductComp",
  data() {
    return {
      name: "",
      price: "",
      productImage: null,
      imageUrl: null,
    };
  },
  methods: {
    onPickFile() {
      this.$refs.input.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
        this.productImage = files[0];
        console.log(this.productImage);
      });
      fileReader.readAsDataURL(files[0]);
    },
  },
};
</script>