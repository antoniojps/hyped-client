<template>
  <el-container class="container">
    <el-aside>
      <TheNav/>
    </el-aside>
    <el-main ref="elLayoutMain">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import { TweenMax } from 'gsap'
import TheNav from '@/components/TheNav.vue'
import { eventBus } from '@/main'

export default {
  name: 'BaseLayout',
  components: {
    TheNav,
  },
  created () {
    eventBus.$on('nav-open', this.navOpen)
    eventBus.$on('nav-close', this.navClose)
  },
  beforeDestroy: function () {
    eventBus.$off('nav-open', this.navOpen)
    eventBus.$off('nav-close', this.navClose)
  },
  methods: {
    navOpen () {
      console.log('open nav')
      const elMain = this.$refs.elLayoutMain.$el
      TweenMax.to(elMain, 0.3, { x: '80%', ease: Power1.easeIn })
    },
    navClose () {
      console.log('close nav')
      const elMain = this.$refs.elLayoutMain.$el
      TweenMax.to(elMain, 0.3, { x: '0%', ease: Power1.easeIn })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.container {
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
  position: relative;
}

.el-aside {
  background-color: $colorBgDark;
  padding: $spacingXSBase $spacingSBase;
  padding-right: 27%;
  width: 100% !important;
  height: 100%;
  position: absolute;
  @include screen(md) {
    padding: $spacingLarge;
    padding-right: $spacingLarge;
    width: 306px !important;
    position: relative;
  }
}

.el-main {
  background-color: $colorBg;
  padding: $spacingXSBase $spacingSBase;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  right:0;
  top:0;
  transform: translateX(0%);
  @include screen(md) {
    padding: $spacingLarge;
    width: auto;
    position: relative;
    transform: translateX(0%);
  }
}
</style>
