<template>
  <span v-if="isTeamCaptain">
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'TeamAuthCaptain',
  props: {
    roster: {
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    isTeamCaptain () {
      const player = this.roster.find(player => player.user._id === this.userId)
      if (!player) return false
      return player.role === 'captain'
    },
  },
}
</script>

<style scoped>

</style>
