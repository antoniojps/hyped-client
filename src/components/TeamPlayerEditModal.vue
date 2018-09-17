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

      <BaseButtonConfirm
        v-else
        :action="playerUpdateToCaptain"
        size="mini"
      >
        <BaseIcon
          class="player__icon"
          height="10"
          src="mix/helmet3"
        />
        Make captain
      </BaseButtonConfirm>
      <BaseButtonConfirm
        :action="playerRemove"
        :loading="loadingPlayerRemove"
        size="mini"
      >
        {{ leaveTeamMsg }}
      </BaseButtonConfirm>
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
import { mapGetters, mapMutations } from 'vuex'
import { mutateTeamPlayerRemove } from '@/utils/requests'
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
  data () {
    return {
      loadingPlayerRemove: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('team', ['team']),
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
  methods: {
    ...mapMutations('team', ['UPDATE_TEAM']),
    async playerRemove () {
      this.loadingPlayerRemove = true
      try {
        if (this.isCaptain) throw new Error('Captain')
        const userId = this.player._id
        const teamId = this.team._id
        const { data: { teamPlayerRemove: updatedTeam } } = await mutateTeamPlayerRemove(this.$apollo, teamId, userId)
        this.UPDATE_TEAM(updatedTeam)
        this.$message({
          message: 'Player removed from team',
          type: 'success',
        })
        this.loadingPlayerRemove = false
      } catch (err) {
        this.loadingPlayerRemove = false
        if (this.isCaptain) {
          this.$message({
            message: 'You cant remove captains',
            type: 'error',
          })
        } else {
          this.$message({
            message: 'Oops, something went wrong...',
            type: 'error',
          })
        }
      }
    },
    playerUpdateToCaptain () {
      console.log('update to captain')
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
