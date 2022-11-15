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
              <router-link to="/signup" class="btn btn-outline-light m-1"
                >Sign Up</router-link
              >
            </li>
            <li>
              <router-link to="/signin" class="btn btn-outline-light m-1"
                >Sign In</router-link
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
              <router-link to="/create" class="btn btn-outline-light m-1"
                >Create product</router-link
              >
            </li>

            <li>
              <button
                @click="signOut"
                class="btn btn-outline-light m-1"
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

<script setup>
import { useStore } from "vuex";

const store = useStore();
const signOut = () => store.dispatch("SignOut");
</script>

<style scoped>

.opacity8{
  opacity: .8;
  position: relative;
  z-index: 1;
  background: black
}
</style>
