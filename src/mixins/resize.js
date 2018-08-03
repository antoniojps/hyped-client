import { BREAKPOINTS } from '@/config'

const resizeMixin = {
  created () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  data () {
    return {
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    }
  },
  computed: {
    breakpointSm () {
      return this.windowWidth >= BREAKPOINTS.sm
    },
    breakpointMd () {
      return this.windowWidth >= BREAKPOINTS.md
    },
    breakpointLg () {
      return this.windowWidth >= BREAKPOINTS.lg
    },
    breakpointXl () {
      return this.windowWidth >= BREAKPOINTS.xl
    },
  },
  methods: {
    handleResize () {
      this.windowWidth = document.documentElement.clientWidth
      this.windowHeight = document.documentElement.clientHeight
    },
  },
}

export default resizeMixin
