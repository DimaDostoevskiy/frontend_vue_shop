<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid d-flex">

        <router-link to="/" class="navbar-brand fs-5">Test </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

        <div id="navbarNavDropdown" class="collapse navbar-collapse justify-content-end">

          <ul v-if="!store.state.token" class="navbar-nav">
            <li>
              <router-link to="/signup" class="btn btn-outline-light">Sign Up</router-link>
            </li>
            <li>
              <router-link to="/signin" class="btn btn-outline-light">Sign In</router-link>
            </li>
          </ul>

          <ul v-if="store.state.token" class="navbar-nav">
            <li>
              <router-link to="/main" class="navbar-brand fs-5"> Shop</router-link>
              <router-link to="/create" class="btn btn-outline-light">Create product</router-link>
            </li>

            <li>
              <button @click="signOut" class="btn btn-outline-light" type="button">
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

import { useStore } from 'vuex';

const store = useStore();
const signOut = () => store.dispatch('SignOut');

</script>

<style scoped>

</style>