<template>
  <div class="app">
    <NavbarComp
      :token="token"
      @showSignUp="showSignUp"
      @showSignIn="showSignIn"
      @signOut="signOut"
      @showCreateProduct="showCreateProduct"
    />

    <template v-if="!token">
      <SignInFormComp @signin="signIn" v-if="activComp === 'sign-in'" />
      <SignUpFormComp @signup="signUp" v-if="activComp === 'sign-up'" />
    </template>

    <template v-if="token">
      <CreateProductComp
        :token="token"
        v-if="activComp === 'create-product'"
      />
      <ShopComp v-if="activComp === 'shop-main'" />
    </template>
  </div>
</template>

<script>
import SignUpFormComp from "./components/SignUpFormComp.vue";
import SignInFormComp from "./components/SignInFormComp.vue";
import NavbarComp from "./components/NavbarComp.vue";
import ShopComp from "./components/ShopComp.vue";
import CreateProductComp from "./components/CreateProductComp.vue";

export default {
  name: "App",
  components: {
    SignUpFormComp,
    SignInFormComp,
    NavbarComp,
    ShopComp,
    CreateProductComp,
  },
  data() {
    return {
      activComp: "",
      token: "",
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) this.token = token;
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
    signIn(token) {
      this.activComp = "shop-main";
      this.token = token;
    },
    signUp(token) {
      this.activComp = "shop-main";
      this.token = token;
    },
    signOut() {
      localStorage.removeItem('token');
      this.token = false;
      this.activComp = "";
    },
  },
};
</script>

<style scoped>
.app {
  font-family: Helvetica, Arial, sans-serif;
  background-color: rgba(22, 22, 42, 0.8);
  height: 100vh;
  margin: 0px;
  padding: 0px;
}
</style>