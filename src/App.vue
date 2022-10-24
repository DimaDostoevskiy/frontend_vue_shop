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
      <MainComp :token="token" v-if="activComp === 'main'" />
      <CreateProductComp v-if="activComp === 'create-product'" :token="token" />
    </template>
  </div>
</template>

<script>
import SignUpFormComp from "./components/SignUpFormComp.vue";
import SignInFormComp from "./components/SignInFormComp.vue";
import NavbarComp from "./components/NavbarComp.vue";
import MainComp from "./components/MainComp.vue";
import CreateProductComp from "./components/CreateProductComp.vue";

export default {
  name: "App",
  components: {
    MainComp,
    NavbarComp,
    SignUpFormComp,
    SignInFormComp,
    CreateProductComp,
  },
  data() {
    return {
      activComp: "",
      token: "",
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