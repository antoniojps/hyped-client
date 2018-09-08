<template>
  <el-button
    :type="typefromActive"
    :icon="icon"
    :size="size"
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
    size: {
      type: String,
      required: false,
      default: '',
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    typefromActive () {
      if (this.active) return 'primary'
      return this.type
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
