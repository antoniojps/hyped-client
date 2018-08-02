<template>
  <BaseImage
    class="page-header__mobile-nav"
    src="ui/nav.svg"
    @click.native.stop="handleNavClick"
  />
</template>

<script>
import { eventBus } from '@/main'
export default {
  name: 'TheNavHamburguer',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    open: function () {
      this.handleNavClick()
    },
  },
  methods: {
    handleNavClick () {
      if (this.open) {
        eventBus.$emit('nav-open')
        this.$emit('nav-open')
      } else {
        eventBus.$emit('nav-close')
        this.$emit('nav-close')
      }
    },
  },
}
</script>

<style scoped>

</style>
