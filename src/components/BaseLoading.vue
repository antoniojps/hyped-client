<template>
  <div class="base-loading">
    <div ref="animationLoading" class="base-loading__anim"/>
    <h3 class="faded">{{ text }}</h3>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import AnimationCarePackage from '@/assets/data/AnimationCarePackage.json'

export default {
  props: {
    text: {
      type: String,
      default: 'Loading',
    },
  },
  mounted () {
    lottie.loadAnimation({
      container: this.$refs.animationLoading,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: AnimationCarePackage,
    })
  },
}
</script>

<style lang="scss" scoped>
.base-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__anim {
    width: 10rem;
    height: auto;
  }
}
</style>
