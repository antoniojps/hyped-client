<template>
  <div>
    <el-form
      ref="teamAddForm"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="Logo">
        <FormPhotoUpload v-model="form.logo"/>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="Tag" prop="shortname">
        <el-input v-model="form.shortname"/>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="marginTopSmall"
          @click="onSubmit"
        >
          Next
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormPhotoUpload from '@/components/FormPhotoUpload.vue'

export default {
  name: 'TeamsCreateModal',
  components: {
    FormPhotoUpload,
  },
  data () {
    return {
      loading: false,
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
    async onSubmit () {
      this.$refs.teamAddForm.validate(async (valid) => {
        if (valid) {
          console.log('create team')
        } else {
          console.log('error')
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
