<template>
  <div class="player">

    <div class="player__lft">
      <div class="player__avatar">
        <UserAvatar :url="avatar" size="medium"/>
      </div>
      <div class="player__info">
        <div class="player__username">
          <h5>{{ user.username }}
            <BaseIcon
              v-if="isCaptain"
              class="player__icon"
              height="10"
              src="mix/helmet3"
            />
          </h5>
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

    <div class="player__rgt">
      <TeamPlayerEditModal :player="user" :is-captain="isCaptain"/>
    </div>

  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue'
import TeamPlayerEditModal from '@/components/TeamPlayerEditModal.vue'

export default {
  name: 'TeamPlayer',
  components: {
    UserAvatar,
    TeamPlayerEditModal,
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
    isCaptain () {
      return this.player.role === 'captain'
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
  justify-content: space-between;
  &__lft {
    display: flex;
    align-items: center;
  }
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
  &__icon {
    margin-left: $spacingSmall;
  }
}
</style>
