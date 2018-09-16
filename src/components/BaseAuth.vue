<template>
  <div v-if="hasPermissions">
    <slot/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    requires: {
      type: String,
      default: 'user',
    },
    redirect: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    ...mapGetters('user', ['user', 'userLogedIn']),
    hasAdminPermissions () {
      if (this.user) return !!this.user.admin
      return false
    },
    hasModeratorPermissions () {
      if (this.user && this.user.moderator) return true
      return this.hasAdminPermissions
    },
    hasPlayerPermissions () {
      if (this.user && this.user.pubgNick !== null) return true
      return false
    },
    hasPermissions () {
      if (this.requires === 'admin') return this.hasAdminPermissions
      if (this.requires === 'moderator') return this.hasModeratorPermissions
      if (this.requires === 'player') return this.hasPlayerPermissions
      return this.userLogedIn
    },
  },
  mounted () {
    if (!this.hasPermissions && this.redirect !== '') this.$router.push(this.redirect)
  },
}
</script>
