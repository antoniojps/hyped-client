<template>
  <div class="user-avatar">
    <UserAvatar :url="userAvatarUrl" size="small"/>
    <div class="user-avatar__name">
      {{ user.username }}
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'UserAvatarWithName',
  components: {
    UserAvatar,
  },
  computed: {
    ...mapGetters('user', ['user']),
    userAvatarUrl () {
      if (this.user && this.user.avatar) return this.user.avatar.small
      return null
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

.user-avatar {
  display:flex;
  align-items:center;
  &__name {
    padding-left: $spacingMSmall;
  }
  .base-image {
    img {
      border: 2px solid red;
    }
  }
}
</style>
