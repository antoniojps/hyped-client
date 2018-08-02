<template>
  <div id="app">
    <BaseLayoutFullscreen v-if="isLayoutFullscreen"/>
    <BaseLayout v-else/>
  </div>
</template>

<script>
// import CURRENT_USER_QUERY from './graphql/CurrentUser.gql'

export default {
  name: 'App',
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
