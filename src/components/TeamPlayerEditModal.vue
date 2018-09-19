<template>
  <el-popover
    placement="top-end"
    width="200"
    trigger="click"
  >
    <div class="player-edit__actions">

      <BaseButtonConfirm
        v-if="isCaptain"
        :action="playerUpdateToPlayer"
        :loading="loadingPlayerUpdate"
        size="mini"
      >
        <BaseIcon
          class="player__icon"
          height="10"
          src="mix/helmet3"
        />
        Remove captain role
      </BaseButtonConfirm>

      <BaseButtonConfirm
        v-else
        :action="playerUpdateToCaptain"
        :loading="loadingPlayerUpdate"
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
import { mutateTeamPlayerRemove, mutateTeamPlayerUpdate } from '@/utils/requests'
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
      loadingPlayerUpdate: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('team', ['team']),
    userId () {
      return this.player._id
    },
    teamId () {
      return this.team._id
    },
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
        const { data: { teamPlayerRemove: updatedTeam } } = await mutateTeamPlayerRemove(this.$apollo, this.teamId, this.userId)
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
    async playerUpdateRole (role) {
      this.loadingPlayerUpdate = true
      try {
        const { data: { teamPlayerUpdate: updatedTeam } } = await mutateTeamPlayerUpdate(this.$apollo, this.teamId, this.userId, role)
        this.UPDATE_TEAM(updatedTeam)
        this.$message({
          message: 'Player role updated',
          type: 'success',
        })
        this.loadingPlayerUpdate = false
      } catch (err) {
        this.loadingPlayerRemove = false
        this.$message({
          message: 'Oops, something went wrong...',
          type: 'error',
        })
      }
    },
    playerUpdateToCaptain () {
      this.playerUpdateRole('captain')
    },
    playerUpdateToPlayer () {
      this.playerUpdateRole('player')
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
