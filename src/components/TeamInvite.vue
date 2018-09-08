<template>
  <div
    v-if="visible"
    class="team__invite paddingBase"
  >
    <el-button
      :loading="loading"
      type="primary"
      class="marginBottom"
      @click="copyToken"
    >
      Copy invite token
    </el-button>

    <el-input
      ref="elToken"
      v-model="inviteToken"
      type="textarea"
      autosize
      readonly
    />

  </div>
</template>

<script>
import TEAM_INVITE_TOKEN_QUERY from '@/graphql/TeamInviteToken.gql'

export default {
  name: 'TeamInvite',
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
    teamId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      teamInviteToken: null,

    }
  },
  computed: {
    loading () {
      return this.$apollo.loading
    },
    inviteToken () {
      if (!this.teamInviteToken) return null
      return this.teamInviteToken.token
    },
  },
  apollo: {
    teamInviteToken () {
      return {
        query: TEAM_INVITE_TOKEN_QUERY,
        variables: {
          teamId: this.teamId,
        },
      }
    },
  },
  methods: {
    copyToken () {
      const { elToken } = this.$refs
      elToken.select()
      const cmdExecuted = document.execCommand('copy')
      if (!cmdExecuted) this.$message.error('Could not copy')
      else this.$message.success('Invite code copied to your clipboard')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

.team__invite {
  background-color:$colorBgDark;
  border-radius: $radius;
  color: $colorBase;
  &-token {
    word-wrap: break-word;
    background-color: $colorBgLight;
    border-radius: $radius;
    color: $colorBase2;
  }
}

</style>
