<template>
  <BasePageFullscreen :loading-msg="loadingMsg" :anim-reveal="false">
    <PageLoginModal @before-login="redirectProvider"/>
  </BasePageFullscreen>
</template>

<script>
import PageLoginModal from '@/components/PageLoginModal'
import { BREAKPOINTS, ENDPOINT } from '@/config'
import { eventBus } from '@/main'

export default {
  name: 'PageLogin',
  components: {
    PageLoginModal,
  },
  data () {
    return {
      loadingMsg: 'Login before they get this care package!',
      provider: '',
    }
  },
  created () {
    eventBus.$on('anim-fillscreen-completed', this.windowRedirect)
  },
  beforeDestroy () {
    eventBus.$off('anim-fillscreen-completed', this.windowRedirect)
  },
  methods: {
    redirectProvider (provider) {
      this.provider = provider
      this.loadingMsg = `Redirecting to ${provider.name}'s website`
      if (window.innerWidth > BREAKPOINTS.sm) {
        eventBus.$emit('anim-fillscreen')
      }
    },
    windowRedirect () {
      window.location = ENDPOINT + this.provider.link
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
