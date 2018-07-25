<template>
  <div id="app">
    <el-container class="is-vertical">

      <TheHeader/>

      <router-view/>

    </el-container>
  </div>
</template>

<script>
// import CURRENT_USER_QUERY from './graphql/CurrentUser.gql'
import TheHeader from '@/components/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
  },
  data () {
    return {
      currentUser: null,
    }
  },
}
</script>
