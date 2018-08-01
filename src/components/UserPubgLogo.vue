<template functional>
  <div class="user-pubg-logo">
    <h4>{{ props.text }}</h4>
  </div>
</template>

<script>
export default {
  name: 'UserPubgLogo',
  props: {
    text: {
      type: String,
      default: 'Pubg',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.user-pubg-logo {
  border: solid $colorBgLight;
  border-width: 8px;
  border-radius: 10px;
  border-image: url("../assets/imgs/bg/user_pubg_logo_border.svg") 7 stretch;
  display: inline-flex;
  margin:0;
  padding:0;
  h4 {
    padding: 0 0.3rem;
    text-transform: uppercase;
    color: $colorBgLight;
    line-height: 1.4rem;
  }
}
</style>
