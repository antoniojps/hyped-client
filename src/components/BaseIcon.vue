<template>
  <div class="base-image">
    <img
      v-cloak
      v-show="loaded"
      :key="src"
      :src="icon"
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

  computed: {
    icon () {
      // eslint-disable-next-line
      return require(`@/assets/imgs/icons/${
        this.src
      }.svg`)
    },
  },
}
</script>

<style lang="scss" scoped>
  .base-image {
    display: inline-flex;
    height:auto;
  }
</style>
