<template>
  <div>
    <nav class="opacity8 navbar navbar-expand-lg navbar-dark">
      <div class="container d-flex">
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

        <router-link to="/" class="navbar-brand fs-5 m-1">Elco</router-link>
        <div
          id="navbarNavDropdown"
          class="collapse navbar-collapse justify-content-end"
        >
          <ul v-if="!store.state.token" class="navbar-nav">
            <li>
              <router-link to="/signup" class="navbar-brand fs-5"
                >sign up</router-link
              >
            </li>
            <li>
              <router-link to="/signin" class="navbar-brand fs-5"
                >sign in</router-link
              >
            </li>
          </ul>

          <ul v-if="store.state.token" class="navbar-nav">
            <li>
              <router-link to="/main" class="navbar-brand fs-5">
                shop</router-link
              >
              <router-link to="/orders" class="navbar-brand fs-5">
                orders</router-link
              >
              <router-link to="/create" class="navbar-brand fs-5"
                >create product</router-link
              >

              <a
                @click="signOut"
                class="navbar-brand fs-5"
                type="button"
              >
                sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
const signOut = () => store.dispatch("SignOut");
</script>

<style scoped>
.opacity8 {
  opacity: 0.8;
  position: relative;
  z-index: 1;
  background: black;
}
</style>
