<template>
  <el-container class="container">
    <el-aside>
      <TheNav/>
    </el-aside>
    <el-main ref="elLayoutMain">
      <router-view :key="$route.fullPath"/>
    </el-main>
  </el-container>
</template>

<script>
import { TweenMax } from 'gsap'
import TheNav from '@/components/TheNav.vue'
import { eventBus } from '@/main'
import { BREAKPOINTS } from '@/config'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'BaseLayout',
  components: {
    TheNav,
  },
  data () {
    return {
      windowWidth: document.documentElement.clientWidth,
    }
  },
  computed: {
    ...mapGetters('ui', ['isNavOpen']),
  },
  created () {
    eventBus.$on('nav-open', this.navOpen)
    eventBus.$on('nav-close', this.navClose)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    eventBus.$off('nav-open', this.navOpen)
    eventBus.$off('nav-close', this.navClose)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapMutations('ui', ['TOGGLE_NAV']),
    navOpen () {
      this.TOGGLE_NAV(true)
      const elMain = this.$refs.elLayoutMain.$el
      TweenMax.to(elMain, 0.3, { x: '80%', ease: Power1.easeIn })
    },
    navClose () {
      this.TOGGLE_NAV(false)
      const elMain = this.$refs.elLayoutMain.$el
      TweenMax.to(elMain, 0.3, { x: '0%', ease: Power1.easeIn })
    },
    handleResize () {
      this.windowWidth = document.documentElement.clientWidth
      if (this.windowWidth > BREAKPOINTS.md) {
        if (this.isNavOpen) eventBus.$emit('nav-close')
      }
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
