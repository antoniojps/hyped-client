<template>
  <el-container class="container">
    <router-view :key="$route.fullPath" class="router-fullscreen"/>
  </el-container>
</template>

<script>
import TheNav from '@/components/TheNav.vue'

export default {
  name: 'BaseLayoutFullscreen',
  components: {
    TheNav,
  },
}
</script>

<style lang="scss" scoped>
  .router-fullscreen {
    width: 100%;
  }
</style>
