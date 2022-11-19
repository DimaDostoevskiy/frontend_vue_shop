<template>
  <div class="effect">
    <div class="canvasWrapper">
      <graph-effect />
    </div>
    <main class="main">
      <h1 class="headline">
        <neon-letter content="W" />elco<neon-letter content="me" />
      </h1>
      <p class="text">
        To the b<neon-letter content="es" />t store
        <neon-letter content="on" /> the entire
        <neon-letter content="inter" />net
      </p>
    </main>
  </div>
</template>

<script setup>
import GraphEffect from "@/components/effects/GraphEffect.vue";
import NeonLetter from "./effects/NeonLetter.vue";
</script>

<style scoped>
.effect {
  text-align: center;
  margin-top: 100px;
}
.canvasWrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
}
.main {
  background: black;
  color: rgb(216, 216, 216);
  display: inline-block;
  position: relative;
  z-index: 1;
  width: 60%;
  padding: 35px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  opacity: 0.95;
}

.headline,
.text {
  text-shadow: -1px 0px 20px rgb(153 153 153);
}
.headline {
  text-transform: uppercase;
  margin-bottom: 20px;
}
.text {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 14px;
}

.text span {
  transition: all 0.1;
}
</style>
