<template>
  <div :style="styleObj" class="avatar">
    <BaseImage
      :src="avatar"
      :height="avatarSize"
      static
      class="avatar"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserAvatar',
  props: {
    size: {
      type: String,
      required: false,
      default: 'small',
    },
  },
  computed: {
    ...mapGetters('user', ['user']),
    avatar () {
      if (this.user && this.user.avatar) return this.user.avatar[this.size]
      return false
    },
    avatarSize () {
      if (this.size === 'small') return '24px'
      else if (this.size === 'medium') return '48px'
      else if (this.size === 'large') return '96px'
      return '24px'
    },
    styleObj () {
      return {
        'height': this.avatarSize,
        'width': this.avatarSize,
      }
    },
  },
}
</script>
