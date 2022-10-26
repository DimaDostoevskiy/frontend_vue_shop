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
      <SignInFormComp @signin="signIn" v-if="activComp === 'sign-in'" />
      <SignUpFormComp @signup="signUp" v-if="activComp === 'sign-up'" />
    </template>

    <template v-if="token">
      <MainComp
        v-if="activComp === 'main'"
        :token="token"
        @showUpdateProduct="showUpdateProduct"
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
import MainComp from "./components/MainComp.vue";
import NavbarComp from "./components/NavbarComp.vue";
import SignUpFormComp from "./components/SignUpFormComp.vue";
import SignInFormComp from "./components/SignInFormComp.vue";
import CreateProductComp from "./components/CreateProductComp.vue";
import UpdateProductComp from "./components/UpdateProductComp.vue";
import OrdersPage from "./components/OrdersPage.vue";

export default {
  name: "App",
  components: {
    MainComp,
    NavbarComp,
    SignUpFormComp,
    SignInFormComp,
    CreateProductComp,
    UpdateProductComp,
    OrdersPage,
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
    if (this.token) this.activComp = "main";
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
      this.activComp = "main";
    },
    signUp(token) {
      this.token = token;
      this.activComp = "main";
    },
    signOut() {
      localStorage.removeItem("token");
      this.token = "";
      this.activComp = "";
    },
  },
};
</script>

<style scoped>
.app {
  font-family: Helvetica, Arial, sans-serif;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  background-color: rgba(42, 42, 42, 1);
}
</style>