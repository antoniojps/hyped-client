<template>
  <div class="form">
    <el-form
      :model="form"
      label-position="top"
    >
      <el-form-item label="Username">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item v-if="providerName === 'steam'" label="Email">
        <el-input
          v-model="form.email"
          placeholder="Your email"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserUpdateForm',
  data () {
    return {
      form: {
        username: '',
        email: '',
      },
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'provider']),
    providerName () {
      const { provider } = this.provider
      return provider
    },
  },
  watch: {
    user () {
      this.form.username = this.user.username
      this.form.email = this.user.email
    },
  },
  methods: {
    onSubmit () {
      console.log('Update user')
    },
  },
}
</script>

<style lang="scss" scoped>
  .form {
    width: 240px;
  }
</style>
