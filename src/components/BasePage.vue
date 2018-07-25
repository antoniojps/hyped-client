<template>
  <div>
    <TheHeader/>
    <el-row class="container containerSpacing">
      <el-col :span="24" class="paddingBase">

        <slot/>

      </el-col>

    </el-row>
  </div>
</template>

<script>
import TheHeader from './TheHeader'

export default {
  name: 'BasePage',
  components: {
    TheHeader,
  },
}
</script>
