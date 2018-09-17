<template>
  <el-popover
    placement="top-end"
    width="200"
    trigger="click"
  >
    <div class="player-edit__actions">

      <el-button
        v-if="isCaptain"
        size="mini"
      >
        <BaseIcon
          class="player__icon"
          height="10"
          src="mix/helmet3"
        />
        Remove captain role
      </el-button>

      <el-button
        v-else
        size="mini"
      >
        <BaseIcon
          class="player__icon"
          height="10"
          src="mix/helmet3"
        />
        Make captain
      </el-button>

      <el-button
        :type="leaveTeamBtnType"
        size="mini"
      >
        {{ leaveTeamMsg }}
      </el-button>
    </div>
    <el-button
      slot="reference"
      icon="el-icon-edit"
      size="mini"
      circle
    />

  </el-popover>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TeamPlayerEditModal',
  props: {
    isCaptain: {
      type: Boolean,
      default: false,
    },
    player: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('user', ['user']),
    isLoggedUser () {
      return this.user._id === this.player._id
    },
    leaveTeamMsg () {
      if (this.isLoggedUser) return 'Leave team'
      return 'Remove from team'
    },
    leaveTeamBtnType () {
      if (this.isLoggedUser) return 'danger'
      return null
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.player-edit {
  &__actions {
    display: flex;
    flex-direction: column;

    button:first-child {
      margin: 0;
    }
    button {
      margin: $spacingLSmall 0 0 0;
    }
  }
}
</style>
