<template>
  <div class="app">
    <NavbarComp
      :isToken="isToken"
      @showSignUp="showSignUp"
      @showSignIn="showSignIn"
      @signOut="signOut"
    />
    <template v-if="!isToken">
      <SignInFormComp @signin="signIn" v-if="activComp === 'signin'" />
      <SignUpFormComp @signup="signUp" v-if="activComp === 'signup'" />
    </template>
    <template v-if="isToken">
      <ShopComp />
    </template>
    <CreateProductComp />
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
      isToken: false,
    };
  },
  methods: {
    showSignIn() {
      this.activComp = "signin";
    },
    showSignUp() {
      this.activComp = "signup";
    },
    signIn(isToken) {
      this.isToken = isToken;
    },
    signUp(isToken) {
      this.isToken = isToken;
    },
    signOut() {
      this.isToken = false;
      this.activComp = "";
    },
  },
};
</script>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: rgba(22, 22, 42, 0.8);
  height: 100vh;
  margin: 0px;
  padding: 0px;
}
</style>