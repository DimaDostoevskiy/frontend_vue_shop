<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from "vue";

// Set canvas
const canvas = ref("canvas");

onMounted(() => {
  

  canvas.value.width = document.body.clientWidth;
  canvas.value.height = document.body.clientHeight;
  const ctx = canvas.value.getContext("2d");
  canvas.value.style.backgroundColor = "rgba(42, 42, 42, 1)";

  let vertexList = [];
  const startVertexCol = canvas.value.width / 16;

  const drowLine = (vertex1, vertex2) => {
    ctx.strokeStyle = "white";
    ctx.moveTo(vertex1.x, vertex1.y);
    ctx.lineTo(vertex2.x, vertex2.y);
    ctx.closePath();
    ctx.stroke();
  };

  const init = () => {
    for (let i = 0; i < startVertexCol; i++) {
      vertexList.push(new Vertex());
    }
  };

  const draw = () => {
    if (!canvas.value) return;
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    vertexList.forEach((i) => i.draw());
    requestAnimationFrame(draw);
  };

  const getRndInt = (min, max) => {
    let rnd = 0;
    while (rnd === 0) {
      rnd = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return rnd;
  };

  const getDistanse = (obj1, obj2) => {
    let dX = obj1.x - obj2.x;
    let dY = obj1.y - obj2.y;
    return Math.sqrt(dX * dX + dY * dY);
  };

  class Vertex {
    constructor() {
      this.x = getRndInt(0, canvas.value.width);
      this.y = getRndInt(0, canvas.value.height);
      this.dx = getRndInt(-1, 2);
      this.dy = getRndInt(-1, 2);
      this.diametr = getRndInt(1, 5);
      this.color = "white";
    }
    draw() {
      for (let i = 0; i < vertexList.length; i++) {
        if (vertexList[i].x === this.x && vertexList[i].y === this.y) continue;
        let distanse = getDistanse(this, vertexList[i]);
        if (distanse < 100) {
          drowLine(this, vertexList[i]);
        }
        if (distanse < this.diametr / 2 + vertexList[i].diametr / 2) {
          this.dx = -this.dx;
          this.dy = -this.dy;
        }
      }

      if (this.x - this.diametr <= 0) this.dx = -this.dx;
      if (this.y - this.diametr <= 0) this.dy = -this.dy;
      if (this.x + this.diametr > canvas.value.width) this.dx = -this.dx;
      if (this.y + this.diametr > canvas.value.height) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.diametr, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  init();
  draw();
});
</script>
