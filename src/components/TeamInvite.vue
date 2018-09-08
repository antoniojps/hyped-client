<template>
  <div
    v-if="visible"
    class="dialog paddingBase"
  >
    <span>This is a message</span>
    <BaseButton>
      Ok
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'TeamInvite',
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

.dialog {
  background-color:$colorBgDark;
  border-radius: $radius;
  z-index: 300;
  color: $colorBase;
}
</style>
