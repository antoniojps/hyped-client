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
        <h1>Player Setup</h1>
      </div>
    </div>
    <div class="modal__input">
      <el-input
        v-model="pubgNick"
        class="modal__input--pubgNick"
        placeholder="Battlegrounds name"
      />
      <el-button
        type="primary"
        class="modal__input--btn"
      >
        Confirm
      </el-button>
    </div>
    <UserPubgLogo :text="pubgLogoText"/>
    <p class="size-sm grey spacing marginTop">By signing in or creating an account, you agree to the terms and conditions & privacy policy. We need this information to ensure that you can use the service, to be able to contact you and to prevent cheating or fraud.</p>
  </div>
</template>

<script>
import resizeMixin from '@/mixins/resize'
import UserPubgLogo from '@/components/UserPubgLogo'

export default {
  name: 'ModalPubgNick',
  components: {
    UserPubgLogo,
  },
  mixins: [resizeMixin],
  data () {
    return {
      pubgNick: '',
    }
  },
  computed: {
    logoHeight () {
      if (this.breakpointMd) return '71px'
      return 'auto'
    },
    pubgLogoText () {
      if (this.pubgNick.split('').length > 4) {
        return this.pubgNick
      }
      return 'Pubg name'
    },
  },
}
</script>

<style lang="scss" scoped>
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
  &__input {
    width: 100%;
    display:inline-grid;
    grid-template-columns: 100%;
    grid-template-areas: "input" "button";
    &--pubgNick {
      grid-area: input;
      margin-bottom: $spacingLSmall;
    }
    &--btn {
      grid-area: button;
      margin-bottom: $spacingBase;
    }
    @include screen(md) {
      grid-template-columns: 2fr $spacingLSmall 1fr;
      grid-template-areas: "input . button";
    }
  }
}
</style>
