<template>
  <div class="base-image">
    <img
      v-show="loaded"
      :key="src"
      :src="image"
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
    image () {
      // eslint-disable-next-line
      return require(`@/assets/imgs/${this.src}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.base-image {
  display: inline-flex;
  height: auto;
}
</style>
