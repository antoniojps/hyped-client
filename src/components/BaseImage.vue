<template>
  <div class="base-image">
    <img
      v-show="loaded"
      :key="src"
      :src="image"
      :height="height"
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
    static: {
      type: Boolean,
      required: false,
      default: false,
    },
    height: {
      type: String,
      default: 'auto',
      required: false,
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
      if (!this.static) return require(`@/assets/imgs/${this.src}`)
      return this.src
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
