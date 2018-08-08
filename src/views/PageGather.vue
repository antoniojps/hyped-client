<template>
  <BasePageFullscreen
    :loading-only="true"
    :loading-msg="loadingMsg"
    :error="error"
  />
</template>

<script>
import userMixin from '@/mixins/user'
import { eventBus } from '@/main'

export default {
  name: 'Gather',
  mixins: [userMixin],
  data () {
    return {
      loadingMsg: 'Welcome to the Hyped Arena!',
      error: false,
    }
  },
  watch: {
    user () {
      if (this.user) {
        if (!this.user.pubgNick) setTimeout(() => { this.$router.push('/pubgnick') }, 800)
        else setTimeout(() => { this.$router.push('/') }, 800)
      }
    },
  },
  created () {
    eventBus.$on('user-error', this.handleUserError)
  },
  beforeDestroy () {
    eventBus.$off('user-error', this.handleUserError)
  },
  methods: {
    handleUserError (err) {
      const { err: authError } = this.$route.query
      this.error = true
      if (authError !== undefined) this.loadingMsg = `${authError}, redirecting...`
      else this.loadingMsg = `${err}, redirecting...`
      setTimeout(() => {
        this.$router.push('/')
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
