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
    hasAdminPermissions: function () {
      if (this.user) return !!this.user.admin
      return false
    },
    hasModeratorPermissions: function () {
      if (this.user && this.user.moderator) return true
      return this.hasAdminPermissions
    },
    hasPermissions: function () {
      if (this.requires === 'admin') return this.hasAdminPermissions
      if (this.requires === 'moderator') return this.hasModeratorPermissions
      return this.userLogedIn
    },
  },
  mounted () {
    if (!this.hasPermissions && this.redirect !== '') this.$router.push(this.redirect)
  },
}
</script>
