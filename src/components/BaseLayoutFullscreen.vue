<template>
  <el-container class="container">
    <router-view/>
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
