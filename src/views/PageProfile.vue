<template>
  <BaseAuth redirect="/">
    <BasePage>
      <template slot="header">
        <h1>Profile</h1>
      </template>
      <div>

        <router-link to="/pubgnick">
          <BaseButton class="marginBottom">Edit PUBG nick</BaseButton>
        </router-link>

        <h3>Settings</h3>
        <UserUpdateForm/>

        <h3>Provider</h3>
        <UserProvider/>

      </div>

    </BasePage>
  </BaseAuth>
</template>

<script>
import UserUpdateForm from '@/components/UserUpdateForm.vue'
import UserProvider from '@/components/UserProvider.vue'

export default {
  name: 'Home',
  components: {
    UserUpdateForm,
    UserProvider,
  },
}
</script>
