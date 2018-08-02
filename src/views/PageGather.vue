<template>
  <BasePage>

    <template slot="header">
      <h1 class="invisible">Loading</h1>
    </template>

    <div class="home">
      <BaseLoading large/>
    </div>

  </BasePage>
</template>

<script>
import userMixin from '@/mixins/user'

export default {
  name: 'Gather',
  mixins: [userMixin],
  data () {
    return {
      currentUser: null,
    }
  },
  watch: {
    user () {
      if (this.user) {
        setTimeout(() => { this.$router.push('/') }, 1000)
      }
    },
  },
}
</script>
