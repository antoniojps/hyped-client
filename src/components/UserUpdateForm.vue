<template>
  <div class="form">
    <el-form
      ref="userUpdateForm"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="Username" prop="username">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item
        v-if="providerName === 'steam'"
        label="Email"
        prop="email"
      >
        <el-input
          v-model="form.email"
          placeholder="Your email"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="marginTopSmall"
          @click="onSubmit"
        >
          Save
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mutateUserUpdate } from '@/utils/requests'
import { debounce } from 'lodash'
import cleanDeep from 'clean-deep'
import userMixin from '@/mixins/user'

export default {
  name: 'UserUpdateForm',
  mixins: [userMixin],
  data () {
    return {
      form: {
        username: '',
        email: '',
      },
      rules: {
        username: [
          { required: true, message: 'Please input an username', trigger: 'blur' },
          { min: 4, max: 16, message: 'Length should be between 4 and 16', trigger: 'blur' },
        ],
        email: [
          { type: 'email', message: 'Please input a correct email address', trigger: 'blur' },
        ],
      },
      loading: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'provider']),
    providerName () {
      const { provider } = this.provider
      return provider
    },
    cleanForm () {
      return cleanDeep(this.form)
    },
  },
  watch: {
    user () {
      this.form.username = this.user.username
      if (this.providerName === 'steam') this.form.email = this.user.email
    },
  },
  methods: {
    async onSubmit () {
      this.$refs.userUpdateForm.validate(async (valid) => {
        if (valid) {
          await this.userUpdateMutation()
        } else {
          console.log('error')
        }
      })
    },
    userUpdateMutation: debounce(async function () {
      this.loading = true
      console.log('user updating')
      try {
        await mutateUserUpdate(this.$apollo, this.user._id, this.cleanForm)
        this.currentUser()
        this.loading = false
        this.$message({
          message: 'Congrats, this is a success message.',
          type: 'success',
        })
      } catch (err) {
        this.$message({
          message: 'Oops, this is a error message.',
          type: 'error',
        })
        this.loading = false
      }
    }, 2000,
    {
      'leading': true,
      'trailing': false,
    }
    ),
  },
}
</script>

<style lang="scss" scoped>
  .form {
    width: 240px;
  }
</style>
