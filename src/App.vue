<template>
  <div id="app">
    <BaseLayoutFullscreen v-if="isLayoutFullscreen"/>
    <BaseLayout v-else/>
  </div>
</template>

<script>
import userMixin from '@/mixins/user'

export default {
  name: 'App',
  mixins: [userMixin],
  computed: {
    isLayoutFullscreen () {
      return this.$route.path === '/login'
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
