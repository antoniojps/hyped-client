<template>
  <div class="team__captain">
    <BaseIcon
      height="16"
      src="mix/helmet3"
    />
    <p v-if="!logoOnly">Captain</p>
  </div>
</template>

<script>
export default {
  name: 'TeamCaptain',
  props: {
    logoOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
  .team {
    &__captain {
      height: 100%;
      display:flex;
      align-items: center;
      margin-left: $spacingLSmall;
      p {
        padding-bottom: 0;
        padding-left: $spacingMSmall;
      }
    }
  }
</style>
