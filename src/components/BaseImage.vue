<template>
  <div class="base-image">
    <img
      v-show="loaded"
      :key="src"
      :src="src"
      @load="loaded = true"
    >
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      loaded: false,
    }
  },
}
</script>

<style lang="scss" scoped>
  .base-image {
    display: inline-flex;
    height:auto;

    img {
      max-width:100%;
      min-width:100%;
    }
  }
</style>
