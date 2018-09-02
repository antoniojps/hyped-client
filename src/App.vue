<template>
  <div id="app">
    <BaseLayoutFullscreen v-if="isLayoutFullscreen"/>
    <BaseLayout v-else/>
  </div>
</template>

<script>
import userMixin from '@/mixins/user'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  mixins: [userMixin],
  computed: {
    isLayoutFullscreen () {
      const fullscreenRoutes = ['/login', '/pubgnick', '/gather', '/createteam']
      return fullscreenRoutes.includes(this.$route.path)
    },
  },
  watch: {
    '$route' (to, from) {
      this.currentUser()
    },
  },
  created () {
    this.UPDATE_GATHER_REDIRECT(this.$route.path)
    this.$router.push('/gather')
  },
  methods: {
    ...mapMutations('ui', ['UPDATE_GATHER_REDIRECT']),
  },
}
</script>

<style lang="scss" scoped>
@import './assets/scss/styles.scss';

.el-aside {
  background-color: $colorBgDark;
  padding: $spacingLarge;
}

.el-main {
  background-color: $colorBg;
  padding: $spacingLarge;
}
</style>
