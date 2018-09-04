<template>
  <div class="player">
    <div class="player__avatar">
      <UserAvatar :url="avatar" size="medium"/>
    </div>
    <div class="player__info">
      <div class="player__username">
        <h5>{{ user.username }}</h5>
      </div>
      <div class="player__pubgNick">
        <BaseIcon
          height="16"
          src="logos/pubg_logo"
        />
        <p class="size-xs paddingFix">{{ user.pubgNick }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue'

export default {
  name: 'TeamPlayer',
  components: {
    UserAvatar,
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  computed: {
    user () {
      return this.player.user
    },
    avatar () {
      return this.user.avatar.medium
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.player {
  display:flex;
  align-items: center;
  padding-bottom: $spacingLSmall;
  &__avatar {
    padding-right: $spacingLSmall;
  }
  &__info {
    display: flex;
    flex-direction: column;
  }
  &__pubgNick {
    display: flex;
    align-items: center;
    p {
      padding-left: $spacingSmall;
    }
  }
}
</style>
