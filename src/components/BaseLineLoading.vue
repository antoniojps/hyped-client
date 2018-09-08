<template>
  <transition name="el-fade-in">
    <div class="base-line-loading">
      <div class="bar"/>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.base-line-loading {
  height: 0;
  z-index: 300;
  top: 0;
  left: 0;
}
.bar {
  height: $borderSize * 3;
  border-radius: $radius;
  background: $colorPrimary;
  position: absolute;
  top: 0;
  animation: bar-animation .8s infinite linear;
}
@keyframes bar-animation {
  0% {
    left: 0;
    right: 100%;
  }
  50% {
    left: 0;
    right: 0;
  }
  100% {
    left: 100%;
    right: 0;
  }
}
</style>
