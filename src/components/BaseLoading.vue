<template>
  <div class="base-loading">
    <div
      ref="animationLoading"
      :class="large ? 'base-loading__anim--large' : 'base-loading__anim'"
    />
    <p class="base-loading__txt faded">{{ text }}</p>
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
    large: {
      type: Boolean,
      default: false,
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

  &__anim--large {
    width: 15rem;
    height: auto;
  }

  &__txt {
    max-width:20rem;
    text-align:center;
    font-weight: bold;
  }
}
</style>
