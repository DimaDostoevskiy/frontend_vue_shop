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

    <template v-if="!token">
      <StartPage v-if="activComp === 'start-page'" />
      <SignInFormComp v-if="activComp === 'sign-in'" @signin="signIn" />
      <SignUpFormComp v-if="activComp === 'sign-up'" @signup="signUp" />
    </template>

    <template v-if="token">
      <MainPage
        v-if="activComp === 'main-page'"
        @showUpdateProduct="showUpdateProduct"
        :token="token"
      />
      <CreateProductComp v-if="activComp === 'create-product'" :token="token" />
      <OrdersPage v-if="activComp === 'orders'" :token="token" />
      <UpdateProductComp
        v-if="activComp === 'update-product'"
        :token="token"
        :updateProduct="updateProduct"
      />
    </template>
  </div>
</template>

<script>
import MainPage from "./components/MainPage.vue";
import StartPage from "./components/StartPage.vue";
import OrdersPage from "./components/OrdersPage.vue";
import NavbarComp from "./components/NavbarComp.vue";
import SignUpFormComp from "./components/SignUpFormComp.vue";
import SignInFormComp from "./components/SignInFormComp.vue";
import CreateProductComp from "./components/CreateProductComp.vue";
import UpdateProductComp from "./components/UpdateProductComp.vue";

export default {
  name: "App",
  components: {
    StartPage,
    MainPage,
    NavbarComp,
    OrdersPage,
    SignUpFormComp,
    SignInFormComp,
    CreateProductComp,
    UpdateProductComp,
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