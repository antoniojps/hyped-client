<template>
  <BasePageFullscreen :loading-msg="loadingMsg" :anim-reveal="false">
    <ModalLogin @before-login="redirectProvider"/>
  </BasePageFullscreen>
</template>

<script>
import ModalLogin from '@/components/ModalLogin'
import { BREAKPOINTS, ENDPOINT } from '@/config'
import { eventBus } from '@/main'
import { mapGetters } from 'vuex'

export default {
  name: 'PageLogin',
  components: {
    ModalLogin,
  },
  data () {
    return {
      loadingMsg: 'Login before they get this care package!',
      provider: '',
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  beforeMount () {
    if (this.user) {
      this.$router.push('/')
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
      if (document.documentElement.clientWidth > BREAKPOINTS.sm) {
        eventBus.$emit('anim-fillscreen')
      } else this.windowRedirect()
    },
    windowRedirect () {
      window.location = ENDPOINT + this.provider.link
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
