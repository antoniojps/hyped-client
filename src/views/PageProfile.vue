<template>
  <BaseAuth redirect="/">
    <BasePage>
      <template slot="header">
        <h1>Profile</h1>
      </template>
      <div>

        <h3>Settings</h3>
        <UserUpdateForm/>

        <h3>Player setup</h3>
        <div class="user-pubgnick">
          <UserPubgLogo
            v-if="user"
            :text="user.pubgNick"
            white
          />
          <router-link to="/pubgnick">
            <BaseButton
              class="marginBottom marginLeft"
              icon="el-icon-edit"
              size="mini"
            />
          </router-link>
        </div>

        <h3>Provider</h3>
        <UserProvider/>

      </div>

    </BasePage>
  </BaseAuth>
</template>

<script>
import UserUpdateForm from '@/components/UserUpdateForm.vue'
import UserProvider from '@/components/UserProvider.vue'
import UserPubgLogo from '@/components/UserPubgLogo.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    UserUpdateForm,
    UserProvider,
    UserPubgLogo,
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>

<style lang="scss" scoped>
  .user-pubgnick {
    display: flex;
    align-items: baseline;
  }
</style>
