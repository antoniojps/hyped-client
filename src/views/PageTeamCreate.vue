<template>
  <BaseAuth redirect="/">
    <BasePageFullscreen :loading-msg="loadingMsg" :anim-reveal="false">
      <BaseLayoutFullscreenTitle title="Create team">
        <TeamCreateModal/>
      </BaseLayoutFullscreenTitle>
    </BasePageFullscreen>
  </BaseAuth>
</template>

<script>
import TeamCreateModal from '@/components/TeamCreateModal.vue'

export default {
  name: 'PageTeamCreate',
  components: {
    TeamCreateModal,
  },
  data () {
    return {
      loadingMsg: 'New team, new chicken dinner!',
    }
  },
}
</script>
