<template>
  <div class="team-logo">
    <img
      v-if="hasLogo"
      :src="logo"
      :alt="shortname"
      class="img-responsive"
    >
    <UserPubgLogo
      v-else
      :text="shortname"
      team
    />
  </div>
</template>

<script>
import UserPubgLogo from '@/components/UserPubgLogo.vue'

export default {
  name: 'TeamLogo',
  components: {
    UserPubgLogo,
  },
  props: {
    shortname: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    hasLogo () {
      return !!this.logo
    },
  },
}
</script>
