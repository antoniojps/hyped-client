<template>
  <div :style="styleObj" class="avatar">
    <BaseImage
      v-if="avatar"
      :src="avatar"
      :height="avatarSize"
      static
      class="avatar"
    />
    <span v-else class="avatar__username">
      {{ usernameMinify }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserAvatar',
  props: {
    url: {
      type: String,
      required: false,
      default: null,
    },
    size: {
      type: String,
      required: false,
      default: 'small',
    },
  },
  computed: {
    ...mapGetters('user', ['user']),
    avatar () {
      if (this.url) return this.url
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
    usernameMinify () {
      const { username } = this.user
      return username[0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.avatar {
  position:relative;
  background-color: $colorBase4;
  &__username {
    position:absolute;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    text-transform: uppercase;
    border-radius:$radius;
    font-family: $fontAlternative;
  }
}
</style>
