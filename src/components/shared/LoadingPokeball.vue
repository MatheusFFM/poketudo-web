<template>
  <div class="center">
    <div class="pokeball">
      <div class="pokeball-button"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoadingPokeball extends Vue {}
</script>
<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.pokeball {
  position: relative;
  width: 200px;
  height: 200px;
  background: #fff;
  border: 10px solid #000;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset -10px 10px 0 10px #ccc;
  animation: shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}

.pokeball::before,
.pokeball::after {
  content: "";
  position: absolute;
}

.pokeball::before {
  background: red;
  width: 100%;
  height: 50%;
}

.pokeball::after {
  top: calc(50% - 10px);
  width: 100%;
  height: 20px;
  background: #000;
}

.pokeball-button {
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  width: 60px;
  height: 60px;
  background: #7f8c8d;
  border: 10px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 10px black;
  z-index: 1;
  animation: shine 0.7s alternate infinite;
}

@keyframes shake {
  0% {
    transform: translate(0, 0) rotate(0);
  }
  20% {
    transform: translate(-6px, 0) rotate(-20deg);
  }
  30% {
    transform: translate(6px, 0) rotate(20deg);
  }
  50% {
    transform: translate(-6px, 0) rotate(-10deg);
  }
  60% {
    transform: translate(6px, 0) rotate(10deg);
  }
  100% {
    transform: translate(0, 0) rotate(0);
  }
}

@keyframes shine {
  from {
    background: #eee;
  }
  to {
    background-color: #e74c3c;
  }
}
</style>
