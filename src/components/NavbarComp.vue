<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a href="/" class="navbar-brand fs-5">Test Shop</a>

        <template v-if="!token">
          <div class="d-flex">
            <button
              type="button"
              class="btn btn-outline-light"
              @click="showSignIn"
            >
              Sign In
            </button>
            <button
              type="button"
              class="btn btn-outline-light"
              @click="showSignUp"
            >
              Sign Up
            </button>
          </div>
        </template>

        <div v-if="token" class="d-flex">
          <button
            type="button"
            class="btn btn-outline-light"
            @click="showCreateProduct"
          >
            Create Product
          </button>

          <button @click="signOut" class="btn btn-outline-light" type="button">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
  
  <script>
export default {
  name: "NavbarComp",
  props: ["token"],
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    showSignIn() {
      this.$emit("showSignIn");
    },
    showSignUp() {
      this.$emit("showSignUp");
    },
    signOut() {
      this.$emit("signOut");
    },
    showCreateProduct() {
      this.$emit("showCreateProduct");
    },
  },
};
</script>

<style scoped>
.btn {
  margin-left: 10px;
  margin-right: 10px;
  border-color: rgba(255, 255, 255, 0.7);
}
</style>