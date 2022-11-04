<template>
  <div class="app">
    <NavbarComp
      @showCreateProduct="showCreateProduct"
      @showOrdersPage="showOrdersPage"
      @showSignUp="showSignUp"
      @showSignIn="showSignIn"
      @signOut="signOut"
      :token="token"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarComp from "@/components/NavbarComp.vue";


export default {
  name: "App",
  components: {
    NavbarComp,
  },
  data() {
    return {
      activComp: "",
      token: "",
      updateProduct: {},
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) this.activComp = "main-page";
    else this.activComp = "start-page";
  },
  methods: {
    showSignIn() {
      this.activComp = "sign-in";
    },
    showSignUp() {
      this.activComp = "sign-up";
    },
    showCreateProduct() {
      this.activComp = "create-product";
    },
    showUpdateProduct(product) {
      this.updateProduct = product;
      this.activComp = "update-product";
    },
    showOrdersPage() {
      this.activComp = "orders";
    },
    signIn(token) {
      this.token = token;
      this.activComp = "main-page";
    },
    signUp(token) {
      this.token = token;
      this.activComp = "main-page";
    },
    signOut() {
      this.token = "";
      this.activComp = "";
      localStorage.removeItem("token");
    },
  },
};
</script>

<style>
.app {
  font-family: Helvetica, Arial, sans-serif;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  background-color: rgba(42, 42, 42, 1);
}
</style>