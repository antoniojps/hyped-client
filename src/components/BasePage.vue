<template>
  <div class="page" @click="isNavOpen = false">
    <div class="page-header">
      <div class="flex">
        <TheNavHamburguer
          :open="isNavOpen"
          @openNav="isNavOpen = true"
          @closeNav="isNavOpen = false"
          @click.native.stop="handleNavClick"
        />
        <h1>Hyped Arena</h1>
      </div>
      <UserPubgLogo/>
    </div>
    <slot/>
  </div>
</template>

<script>
import UserPubgLogo from '@/components/UserPubgLogo.vue'
import TheNavHamburguer from '@/components/TheNavHamburguer'

export default {
  name: 'BasePage',
  components: {
    UserPubgLogo,
    TheNavHamburguer,
  },
  data () {
    return {
      isNavOpen: false,
    }
  },
  methods: {
    handleNavClick () {
      if (this.isNavOpen) this.isNavOpen = false
      else this.isNavOpen = true
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/styles.scss';
  .page {
    height:100%;
  }
  .page-header {
    display:flex;
    justify-content: space-between;
    align-items: center;
    &__mobile-nav {
      cursor: pointer;
      padding-right: 1rem;
      display: flex;
      @include screen(md) {
        display: none;
      }
    }
  }
</style>
