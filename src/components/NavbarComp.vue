<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-brand fs-5">Test Shop</div>

        <template v-if="!hasToken">
          <div class="d-flex">
            <button @click="signIn" class="btn btn-outline-light" type="button">
              Sign In
            </button>
            <button @click="signUp" class="btn btn-outline-light" type="button">
              Sign Up
            </button>
          </div>
        </template>

        <div v-if="hasToken" class="d-flex">
          <button
            @click="createProduct"
            class="btn btn-outline-light"
            type="button"
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
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    signIn() {
      this.$emit("showSignIn");
    },
    signUp() {
      this.$emit("showSignUp");
    },
    createProduct() {
      this.$emit("showCreateProduct");
    },
    signOut() {
      this.$emit("signOut");
    },
  },
  props: ["hasToken"],
};
</script>

<style scoped>
.btn {
  margin-left: 10px;
  margin-right: 10px;
  border-color: rgba(255, 255, 255, 0.7);
}
</style>