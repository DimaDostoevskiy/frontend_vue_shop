<script setup>
import NavbarComp from "@/components/NavbarComp.vue";
</script>

<template>
  <div class="app">
    <NavbarComp />
    <router-view></router-view>
  </div>
</template>

<style>
.app {
  font-family: Helvetica, Arial, sans-serif;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  background-color: rgba(42, 42, 42, 1);
}
</style>