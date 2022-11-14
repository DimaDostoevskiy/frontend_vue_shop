<template>
  <div class="app">
    <NavbarComp />
    <router-view></router-view>
  </div>
</template>

<script setup>

import NavbarComp from "@/components/NavbarComp.vue";
import { onMounted } from "vue";
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.commit('setToken', localStorage.getItem('token'));
})

</script>

<style>
.app {
  font-family: Helvetica, Arial, sans-serif;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  background-color: rgba(16, 16, 16, 1);
}
</style>