<template>
  <div
    class="page-header__mobile-nav"
    @click.native.stop="handleNavClick"
  >
    <svg
      width="22px"
      height="22px"
      viewBox="0 0 22 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Dashboard-Player"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="Mobile"
          :fill="color"
          transform="translate(-22.000000, -23.000000)"
        >
          <g id="nav" transform="translate(22.000000, 23.000000)">
            <rect
              id="Rectangle-4"
              x="0"
              y="0"
              width="22"
              height="3"
              rx="1.5"
            />
            <rect
              id="Rectangle-4-Copy"
              x="0"
              y="7"
              width="22"
              height="3"
              rx="1.5"
            />
            <rect
              id="Rectangle-4-Copy-2"
              x="0"
              y="14"
              width="22"
              height="3"
              rx="1.5"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
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
  computed: {
    color () {
      if (this.$store.state.isNavOpen) return '#D89907'
      return '#FFFFFF'
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
      } else {
        eventBus.$emit('nav-close')
      }
    },
  },
}
</script>

<style scoped>

</style>
