<template>
  <div class="page-login">
    <div class="page-login__wrapper">
      <div class="page-login__lft paddingLarge">
        <PageLoginModal/>
      </div>
      <div class="page-login__rgt paddingLarge">
        <BaseLoading large text="Login before they get this care package!"/>
      </div>
    </div>

  </div>
</template>

<script>
import PageLoginModal from '@/components/PageLoginModal'

export default {
  name: 'PageLogin',
  components: {
    PageLoginModal,
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

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
  }
  &__lft {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__rgt {
    width: 40%;
    height: 100%;
    background-image: url('../assets/imgs/bg/login_bg.svg')

  }
}
</style>
