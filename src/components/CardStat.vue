<template>
  <div class="card-stat">
    <h3>{{ stat.value }}</h3>
    <p>{{ stat.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardStat',
  props: {
    stat: {
      type: Object,
      required: true,
    },
  },

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.card-stat {
  padding: $spacingLSmall $spacingMSBase;
  background-color: $colorBgDark;
  border-radius: $radius;
  h3 {
    margin-bottom: $spacingSmall;
  }
  p {
    color: $colorBase3;
    padding-bottom: 0;
  }
}

</style>
