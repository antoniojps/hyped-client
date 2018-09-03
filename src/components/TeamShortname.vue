<template functional>
  <div class="team-shortname">
    <h4>[{{ props.shortname }}]</h4>
  </div>
</template>

<script>
export default {
  name: 'TeamShortname',
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

.team {
  &-shortname {
    h4 {
      color: $colorPrimary;
      text-transform: initial;
    }
    font-family: $fontAlternative;
  }
}
</style>
