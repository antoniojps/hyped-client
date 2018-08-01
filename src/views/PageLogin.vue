<template>
  <div class="page-login">
    <div class="page-login__wrapper">
      <div ref="elPageLoginLeft" class="page-login__lft paddingLarge">
        <PageLoginModal @before-login="redirectProvider"/>
      </div>
      <div ref="elPageLoginRight" class="page-login__rgt paddingLarge">
        <div class="page-login__waves"/>
        <BaseLoading
          :text="loadingMsg"
          large
          class="page-login__loading"
        />
      </div>
    </div>

  </div>
</template>

<script>
import PageLoginModal from '@/components/PageLoginModal'
import { TweenLite } from 'gsap'

export default {
  name: 'PageLogin',
  components: {
    PageLoginModal,
  },
  data () {
    return {
      loadingMsg: 'Login before they get this care package!',
    }
  },
  methods: {
    async redirectProvider (provider) {
      this.loadingMsg = `Redirecting to ${provider.name}'s website`
      if (window.innerWidth > process.env.VUE_APP_BREAKPOINT_SM) await this.animFillScreen()
      window.location = process.env.VUE_APP_SERVER_URL + provider.link
    },
    animFillScreen () {
      return new Promise((resolve) => {
        const elRight = this.$refs.elPageLoginRight
        TweenLite.to(elRight, 1, { width: '100%',
          zIndex: 999,
          ease: Back.easeOut.config(1.7),
          onComplete: resolve })
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
.page-login {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
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
    align-items: center;
    justify-content: center;
    position:absolute;
    background: linear-gradient(to left, $colorBgDark 100%);
    left:0;
    top:0;
    @include screen(sm){
      width: 60%;
    }
  }
  &__rgt {
    width: 40%;
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
