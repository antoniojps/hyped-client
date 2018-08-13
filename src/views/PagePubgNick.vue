<template>
  <BaseAuth redirect="/">
    <BasePageFullscreen :loading-msg="loadingMsg">
      <UserPubgNickModal/>
    </BasePageFullscreen>
  </BaseAuth>
</template>

<script>
import UserPubgNickModal from '@/components/UserPubgNickModal'
import { mapGetters } from 'vuex'

export default {
  name: 'PagePubgNick',
  components: {
    UserPubgNickModal,
  },
  data () {
    return {
      loadingMsg: 'This package is waiting for you!',
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
body {
  background: linear-gradient(to left, $colorBg 100%);
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
