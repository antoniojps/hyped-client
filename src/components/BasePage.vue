<template>
  <div>
    <div class="page-header">
      <h1>Hyped Arena</h1>
      <UserPubgLogo/>
    </div>
    <slot/>
  </div>
</template>

<script>
import UserPubgLogo from '@/components/UserPubgLogo.vue'

export default {
  name: 'BasePage',
  components: {
    UserPubgLogo,
  },
}
</script>

<style lang="scss" scoped>
  .page-header {
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
