<template>
  <div class="team__join paddingBase">
    <el-form
      ref="teamJoinForm"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="Invitation code" prop="token">
        <el-input
          v-model="form.token"
          type="text"
          auto-complete="off"
          placeholder="Paste the invite code here"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="marginTopSmall"
          @click.native="onSubmit"
        >
          Join team
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { mutateTeamPlayerAdd } from '@/utils/requests'
import { regexJwt } from '@/utils/constants'

export default {
  name: 'TeamJoin',
  data () {
    return {
      form: {
        token: null,
      },
      rules: {
        token: [
          { required: true, message: 'Please input am invitation code', trigger: 'blur' },
          { type: 'string', message: 'Please input a valid invitation code', trigger: 'blur', pattern: regexJwt },
        ],
      },
      loading: false,
      joinedTeam: null,
    }
  },
  methods: {
    onSubmit () {
      this.$refs.teamJoinForm.validate((valid) => {
        if (valid) this.joinTeam()
      })
    },
    async joinTeam () {
      this.loading = true
      try {
        const { data: { teamPlayerAdd } } = await mutateTeamPlayerAdd(this.$apollo, this.form.token)
        this.loading = false
        this.joinedTeam = teamPlayerAdd
        this.emitJoinedTeam()
        this.$message({
          message: `Joined team ${teamPlayerAdd.name}`,
          type: 'success',
        })
      } catch (err) {
        this.$message({
          message: this.errorMessage(err),
          type: 'error',
        })
        this.loading = false
      }
    },
    emitJoinedTeam () {
      this.$emit('update:teams', this.joinedTeam)
    },
    errorMessage (err) {
      let errMessage = null
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        errMessage = err.graphQLErrors[0].message
      }

      if (errMessage === 'Player already in team') return 'You already in this team'
      if (errMessage === 'jwt malformed') return 'Invalid invitation code'
      return 'Oops, something went wrong...'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.team__join {
  background-color:$colorBgDark;
  border-radius: $radius;
  color: $colorBase;
}
</style>
