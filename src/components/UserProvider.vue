<template>
  <div class="provider">
    <div class="provider__icon">
      <BaseIcon :src="providerIconSrc" height="46px"/>
    </div>
    <div class="provider__info">
      <h3>{{ provider.provider }}</h3>
      <p class="grey size-sm">{{ provider.id }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['provider']),
    providerIconSrc () {
      const { provider } = this.provider
      return `providers/logo-${provider}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.provider {
  display: flex;
  &__icon {
    padding-top: $spacingSmall;
    padding-right: $spacingLSmall;
  }
}
</style>
