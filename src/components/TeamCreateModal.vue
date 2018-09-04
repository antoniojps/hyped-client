<template>
  <div>
    <transition
      name="el-fade-in"
      mode="out-in"
    >
      <el-form
        v-if="editing"
        ref="teamAddForm"
        :model="form"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Logo">
          <FormPhotoUpload v-model="form.logo"/>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" placeholder="Team name"/>
        </el-form-item>
        <el-form-item label="Tag" prop="shortname">
          <el-input v-model="form.shortname" placeholder="Team shortname"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="marginTopSmall"
            @click="onSubmit"
          >
            Next
          </el-button>
        </el-form-item>
      </el-form>

      <div v-else>
        <TeamCard
          :name="form.name"
          :shortname="form.shortname"
          :logo="form.logo"
        />
        <div class="marginVertBase">
          <el-button
            :disabled="created"
            class="marginTopSmall"
            @click="goBack"
          >
            Edit
          </el-button>
          <el-button
            :disabled="created"
            :loading="loading"
            type="primary"
            class="marginTopSmall"
            @click="createTeam"
          >
            Confirm
          </el-button>
        </div>
      </div>
    </transition>
    <el-button
      :disabled="created"
      size="mini"
      class="marginTop"
      @click="goBack"
    >
      Go back
    </el-button>
  </div>
</template>

<script>
import FormPhotoUpload from '@/components/FormPhotoUpload.vue'
import TeamCard from '@/components/TeamCard.vue'
import { mutateTeamAdd } from '@/utils/requests'

export default {
  name: 'TeamCreateModal',
  components: {
    FormPhotoUpload,
    TeamCard,
  },
  data () {
    return {
      loading: false,
      created: false,
      editing: true,
      team: null,
      loadingMsg: 'New team, new chicken dinner!',
      form: {
        logo: null,
        name: null,
        shortname: null,
      },
      rules: {
        name: [
          { required: true, message: 'Please input a name', trigger: 'blur' },
          { min: 2, max: 25, message: 'Length should be between 2 and 25', trigger: 'blur' },
        ],
        shortname: [
          { required: true, message: 'Please input a tag', trigger: 'blur' },
          { min: 2, max: 5, message: 'Length should be between 2 and 5', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    onSubmit () {
      this.$refs.teamAddForm.validate((valid) => {
        if (valid) this.editing = false
      })
    },
    async createTeam () {
      this.loading = true
      try {
        const { data: { teamAdd: team } } = await mutateTeamAdd(this.$apollo, this.form)
        this.team = team
        this.loading = false
        this.created = true
        this.$message({
          message: 'Team created',
          type: 'success',
        })
        this.redirect()
      } catch (err) {
        this.loading = false
        const code = err.graphQLErrors[0].extensions.code
        if (code === 400) {
          this.loading = false
          this.$message({
            message: 'Name already taken',
            type: 'error',
          })
          // eslint-disable-next-line
          return;
        }
        this.$message({
          message: 'Oops, something went wrong...',
          type: 'error',
        })
      }
    },
    redirect () {
      this.$router.push('/teams')
    },
    goBack () {
      if (this.editing) this.redirect()
      else this.editing = true
    },
  },
}
</script>
