<template>
  <div class="page-fullscreen">
    <div class="page-fullscreen__wrapper">
      <div ref="elPageFullscreenLeft" class="page-fullscreen__lft">
        <slot/>
      </div>
      <div
        ref="elPageFullscreenRight"
        :style="initStyle"
        :class="loadingOnly && 'page-fullscreen__rgt--loadingOnly'"
        class="page-fullscreen__rgt"
      >
        <div class="page-fullscreen__waves"/>
        <BaseLoading
          v-if="!error"
          :text="loadingMsg"
          :large="isBreakpointMd"
          class="page-fullscreen__loading"
        />
        <BaseError
          v-else
          :text="loadingMsg"
          :large="isBreakpointMd"
          class="page-fullscreen__loading"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { TweenLite } from 'gsap'
import { eventBus } from '@/main'
import { BREAKPOINTS } from '@/config'

export default {
  name: 'BasePageFullscreen',
  props: {
    animReveal: {
      type: Boolean,
      default: true,
    },
    loadingOnly: {
      type: Boolean,
      default: false,
    },
    loadingMsg: {
      type: String,
      default: 'Loading',
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      initStyle: '',
    }
  },
  computed: {
    isBreakpointMd () {
      return document.documentElement.clientWidth >= BREAKPOINTS.md
    },
  },
  created () {
    eventBus.$on('anim-fillscreen', this.animFillScreen)
  },
  beforeDestroy () {
    eventBus.$off('anim-fillscreen', this.animFillScreen)
  },
  async mounted () {
    if (!this.loadingOnly && this.animReveal) await this.animRevealScreen()
    if (!this.loadingOnly && !this.animReveal) this.initStyle = { width: '40%' }
  },
  methods: {
    animFillScreen () {
      return new Promise((resolve) => {
        const elRight = this.$refs.elPageFullscreenRight
        TweenLite.to(elRight, 1, { width: '100%',
          zIndex: 999,
          ease: Back.easeOut.config(1.7),
          onComplete: () => { eventBus.$emit('anim-fillscreen-completed') } })
      })
    },
    animRevealScreen () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const elRight = this.$refs.elPageFullscreenRight
          TweenLite.to(elRight, 1, { width: '40%',
            zIndex: 999,
            ease: Back.easeOut.config(1.7),
            onComplete: resolve })
        }, 400)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
body {
  background: linear-gradient(to left, $colorBg 100%)
}
.page-fullscreen {
  width: 100%;
  height: 100%;
  top: 0;
  @include screen(sm){
    left: 0;
    position: absolute;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position:relative;
  }
  &__lft {
    width: 100%;
    height: 100%;
    display: flex;
    position:absolute;
    background: linear-gradient(to left, $colorBgDark 100%);
    left:0;
    top:0;
    align-items: center;
    justify-content: center;
    @include screen(sm){
      width: 60%;
    }
  }
  &__rgt {
    width: 100%;
    height: 100%;
    position:relative;
    background-color: $colorBg;
    display:none;
    position:absolute;
    right:0;
    top:0;
    @include screen(sm){
      display:block;
    }
    z-index: 1;
    &--loadingOnly {
      display: block;
    }
  }
  &__waves {
    width:100%;
    height:100%;
    top:0;
    left:100%;
    position:absolute;
    transform: translateX(-120%);
    background-image: url('../assets/imgs/bg/login_bg.svg');
    z-index:-10;
  }
}
</style>
