<template>
  <BaseAuth redirect="/">
    <BasePageFullscreen :loading-msg="loadingMsg">
      <BaseLayoutFullscreenTitle title="Create team">
        <TeamsCreateModal/>
      </BaseLayoutFullscreenTitle>
    </BasePageFullscreen>
  </BaseAuth>
</template>

<script>
import TeamsCreateModal from '@/components/TeamsCreateModal.vue'

export default {
  name: 'PageTeamsCreate',
  components: {
    TeamsCreateModal,
  },
  data () {
    return {
      loadingMsg: 'New team, new chicken dinner!',
    }
  },
}
</script>
