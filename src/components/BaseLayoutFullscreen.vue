<template>
  <el-container class="container">
    <router-view :key="$route.fullPath"/>
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
