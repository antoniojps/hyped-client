<template>
  <BaseAuth redirect="/login">
    <BasePageFullscreen :loading-msg="loadingMsg">
      <BaseLayoutFullscreenTitle title="Player Setup">
        <UserPubgNickModal/>
      </BaseLayoutFullscreenTitle>
    </BasePageFullscreen>
  </BaseAuth>
</template>

<script>
import UserPubgNickModal from '@/components/UserPubgNickModal'

export default {
  name: 'PagePubgNick',
  components: {
    UserPubgNickModal,
  },
  data () {
    return {
      loadingMsg: 'This package is waiting for you!',
    }
  },
}
</script>
