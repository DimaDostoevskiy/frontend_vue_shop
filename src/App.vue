<template>
  <div class="app">
    <NavbarComp
      :hasToken="hasToken"
      @showSignUp="showSignUp"
      @showSignIn="showSignIn"
      @signOut="signOut"
      @showCreateProduct="showCreateProduct"
    />

    <template v-if="!hasToken">
      <SignInFormComp @signin="signIn" v-if="activComp === 'sign-in'" />
      <SignUpFormComp @signup="signUp" v-if="activComp === 'sign-up'" />
    </template>

    <template v-if="hasToken">
      <CreateProductComp v-if="activComp === 'create-product'" />
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
      hasToken: false,
    };
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
    signIn(hasToken) {
      this.activComp = "shop-main";
      this.hasToken = hasToken;
    },
    signUp(hasToken) {
      this.activComp = "shop-main";
      this.hasToken = hasToken;
    },
    signOut() {
      this.hasToken = false;
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