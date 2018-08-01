<template>
  <div id="app">
    <el-container class="container">
      <el-container>
        <el-aside width="306px">
          <TheNav/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import CURRENT_USER_QUERY from './graphql/CurrentUser.gql'
import TheNav from '@/components/TheNav.vue'

export default {
  name: 'App',
  components: {
    TheNav,
  },
  data () {
    return {
      currentUser: null,
    }
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
