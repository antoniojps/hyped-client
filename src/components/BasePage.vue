<template>
  <div class="page" @click="handlePageClick">
    <div class="page-header">
      <div class="flex">
        <TheNavHamburguer
          v-cloak
          :open="isNavOpen"
          @click.native.stop="handleNavClick"
        />
        <slot name="header"/>
      </div>
      <UserPubgLogo
        :text="pubgLogoName"
        class="desktop"
      />
    </div>
    <div class="page-actions">
      <slot name="actions"/>
    </div>
    <slot/>
  </div>
</template>

<script>
import UserPubgLogo from '@/components/UserPubgLogo.vue'
import TheNavHamburguer from '@/components/TheNavHamburguer'
import { mapMutations, mapGetters } from 'vuex'
import { BREAKPOINTS } from '@/config'

export default {
  name: 'BasePage',
  components: {
    UserPubgLogo,
    TheNavHamburguer,
  },
  data () {
    return {
      windowWidth: document.documentElement.clientWidth,
    }
  },
  computed: {
    ...mapGetters('ui', ['isNavOpen']),
    ...mapGetters('user', ['user', 'userLogedIn']),
    pubgLogoName () {
      if (this.userLogedIn) {
        const {pubgNick, username} = this.user
        if (pubgNick) return pubgNick
        else return username
      }
      return 'PUBG'
    },
  },
  created () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapMutations('ui', ['TOGGLE_NAV']),
    handleNavClick () {
      if (this.windowWidth <= BREAKPOINTS.md) {
        if (this.isNavOpen) this.TOGGLE_NAV(false)
        else this.TOGGLE_NAV(true)
      }
    },
    handlePageClick () {
      if (this.windowWidth <= BREAKPOINTS.md && this.isNavOpen) this.TOGGLE_NAV(false)
    },
    handleResize () {
      this.windowWidth = document.documentElement.clientWidth
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/styles.scss';
  .page {
    height:100%;
    &-header {
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacingLSmall;
    @include screen(md) {
      margin-bottom: $spacingBase;
    }
      &__mobile-nav {
        cursor: pointer;
        padding-right: 1rem;
        display: flex;
        @include screen(md) {
          display: none;
        }
      }
    }
    &-actions {
      display:flex;
      flex-wrap: wrap;
      flex-direction: column;
      button, div {
        margin-left:0;
        margin-top: $spacingLSmall;
      }
      @include screen(md) {
        flex-direction: row;
        button, div {
          margin-right: $spacingBase;
          margin-top: $spacingSmall;
        }
      }
    }
  }
</style>
