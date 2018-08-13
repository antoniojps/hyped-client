<template>
  <el-button
    :type="type"
    :icon="icon"
    :style="`background-color: ${costumColor}`"
    class="button"
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
    icon: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

.button {
  padding: $spacingLSmall $spacingMSBase;
}
</style>
