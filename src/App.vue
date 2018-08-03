<template>
  <div id="app">
    <transition name="el-fade-in" mode="out-in">
      <BaseLayoutFullscreen v-if="isLayoutFullscreen"/>
      <BaseLayout v-else/>
    </transition>
  </div>
</template>

<script>
import userMixin from '@/mixins/user'

export default {
  name: 'App',
  mixins: [userMixin],
  computed: {
    isLayoutFullscreen () {
      const whiteListed = ['/login', '/pubgname']
      return whiteListed.includes(this.$route.path)
    },
  },
  watch: {
    '$route' (to, from) {
      this.currentUser()
    },
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
