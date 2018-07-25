<template>
  <el-row class="container containerSpacing">

    <el-col :span="24" class="paddingBase">

      <slot/>

    </el-col>

  </el-row>
</template>

<script>
export default {
  name: 'BasePage',
}
</script>
