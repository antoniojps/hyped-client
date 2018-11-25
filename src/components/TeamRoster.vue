<template>
  <div class="roster">
    <TeamPlayer
      v-for="player in roster"
      :key="player._id"
      :player="player"
      :edit-visible="false"
    />
  </div>
</template>

<script>
import TeamPlayer from '@/components/TeamPlayer.vue'

export default {
  name: 'TeamRoster',
  components: {
    TeamPlayer,
  },
  props: {
    roster: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.roster {
  padding: $spacingLSmall $spacingMSBase;
}
</style>
