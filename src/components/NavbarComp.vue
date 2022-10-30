<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid d-flex">
        <a href="/" class="navbar-brand fs-5">Test Shop</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          id="navbarNavDropdown"
          class="collapse navbar-collapse justify-content-end"
        >
          <ul v-if="!token" class="navbar-nav">
            <li>
              <button
                type="button"
                class="btn btn-outline-light"
                @click="showSignIn"
              >
                Sign In
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-outline-light"
                @click="showSignUp"
              >
                Sign Up
              </button>
            </li>
          </ul>

          <ul v-if="token" class="navbar-nav">
            <li>
              <button
                type="button"
                class="btn btn-outline-light"
                @click="showCreateProduct"
              >
                Create Product
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-outline-light"
                @click="showOrdersPage"
              >
                Orders
              </button>
            </li>
            <li>
              <button
                @click="signOut"
                class="btn btn-outline-light"
                type="button"
              >
                Sign Out
              </button>
            </li>
          </ul>
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
    showOrdersPage() {
      this.$emit("showOrdersPage");
    },
  },
};
</script>

<style scoped>
.navbar-nav li {
  margin: 5px;
  text-align: center;
}
</style>