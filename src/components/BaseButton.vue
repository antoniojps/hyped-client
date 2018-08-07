<template>
  <el-button
    :type="type"
    :style="`background-color: ${costumColor}`"
  >
    <slot/>
  </el-button>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line
    costumColor: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
