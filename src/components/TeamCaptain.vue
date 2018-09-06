<template>
  <div class="team__captain">
    <BaseIcon
      height="16"
      src="mix/helmet3"
    />
    <p>Captain</p>
  </div>
</template>

<script>
export default {
  name: 'TeamCaptain',
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
  .team {
    &__captain {
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
