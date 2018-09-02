<template>
  <BaseAuth redirect="/">
    <BasePageFullscreen :loading-msg="loadingMsg">
      <BaseLayoutFullscreenTitle title="Create team">
        <FormPhotoUpload/>
      </BaseLayoutFullscreenTitle>
    </BasePageFullscreen>
  </BaseAuth>
</template>

<script>
import FormPhotoUpload from '@/components/FormPhotoUpload.vue'

export default {
  name: 'PageTeamsCreate',
  components: {
    FormPhotoUpload,
  },
  data () {
    return {
      loadingMsg: 'New team, new chicken dinner!',
    }
  },
}
</script>
