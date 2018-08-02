<template>
  <div class="page" @click="isNavOpen = false">
    <div class="page-header">
      <div class="flex">
        <TheNavHamburguer
          v-cloak
          :open="isNavOpen"
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
import { mapMutations } from 'vuex'

export default {
  name: 'BasePage',
  components: {
    UserPubgLogo,
    TheNavHamburguer,
  },
  computed: {
    isNavOpen () {
      return this.$store.state.isNavOpen
    },
  },
  methods: {
    ...mapMutations(['navHandler']),
    handleNavClick () {
      if (this.isNavOpen) this.navHandler(false)
      else this.navHandler(true)
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
