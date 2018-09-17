<template>
  <el-button
    :size="size"
    :type="btnType"
    :loading="loading"
    @click="handleClick"
  >
    <slot v-if="!isConfirming"/>
    <span v-else>
      Confirm
    </span>
  </el-button>
</template>

<script>
export default {
  name: 'BaseButtonConfirm',
  props: {
    size: {
      type: String,
      default: 'small',
      required: false,
    },
    action: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      isConfirming: false,
    }
  },
  computed: {
    btnType () {
      if (this.isConfirming) return 'danger'
      return null
    },
  },
  methods: {
    handleClick () {
      if (!this.isConfirming) this.isConfirming = true
      else {
        this.action()
        this.isConfirming = false
      }
    },
  },
}
</script>

<style scoped>

</style>
