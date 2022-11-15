<template>
  <span :style="{ color: activeColor, textShadow: activeShadow }">{{ content }}</span>
</template>

<script setup>
  import { onMounted, ref, defineProps } from 'vue';
  import rand from '@/helpers/random'

  defineProps(['content'])

const activeColor = ref("white");
const activeShadow = ref("white");

onMounted(() => {
  // let fastFlash = setInterval(() => {

  let fastFlash = setInterval(() => {
    let rd = rand(0, 255);
    let skip = rand(0, 100);
    if (skip > 15) return;
    activeColor.value = `rgb(${rd}, ${rd}, ${rd})`;
    activeShadow.value = `-1px 0px 20px rgb(${rd}, ${rd}, ${rd})`;
  }, 60);

  setTimeout(() => {
    clearInterval(fastFlash);
    activeColor.value = "rgb(50, 50, 50)";
    let color = 50;
    let fix = setInterval(() => {
      activeColor.value = `rgb(${color}, ${color}, ${color})`;
      activeShadow.value = `-1px 0px 20px rgb(${color}, ${color}, ${color})`;
      color += 2;

      if (color > 215) {
        clearInterval(fix);
      }
    }, 50);
  }, 3000);
});
</script>
