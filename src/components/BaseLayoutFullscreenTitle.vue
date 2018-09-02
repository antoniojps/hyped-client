<template>
  <div class="modal">

    <div class="modal__header">
      <BaseIcon
        :height="logoHeight"
        class="modal__logo"
        src="logos/hyped_logo"
      />
      <div class="modal__title">
        <h4 class="active">Hyped arena</h4>
        <h1>{{ title }}</h1>
      </div>
    </div>

    <slot/>
  </div>
</template>

<script>
import resizeMixin from '@/mixins/resize'

export default {
  mixins: [resizeMixin],
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    logoHeight () {
      if (this.breakpointMd) return '71px'
      return 'auto'
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
.modal {
  max-width: 260px;
  @include screen(md) {
    max-width: 350px;
  }
  &__header{
    display: flex;
    align-items: flex-end;
    margin-bottom: $spacingLSmall;
    @include screen(md){
      margin-bottom: $spacingBase;
    }
  }
  &__title {
    padding-left: $spacingAverage;
    h1, h4 {
      line-height: $sizeLarge;
    }
    @include screen(md) {
      h1, h4 {
        line-height: $sizeXLarge;
      }
    }
  }
}
</style>
