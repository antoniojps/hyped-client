<template>
  <div class="base-error">
    <div
      ref="animationError"
      :class="large ? 'base-error__anim--large' : 'base-error__anim'"
    />
    <p class="base-error__txt faded">{{ text }}</p>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import AnimationSadPan from '@/assets/data/AnimationSadPan.json'

export default {
  props: {
    text: {
      type: String,
      default: 'Error',
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  mounted () {
    lottie.loadAnimation({
      container: this.$refs.animationError,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: AnimationSadPan,
    })
  },
}
</script>

<style lang="scss" scoped>
.base-error {
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
