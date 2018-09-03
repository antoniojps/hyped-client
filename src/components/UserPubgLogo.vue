<template>
  <div
    :style="`border-image: url('${borderImageSrc}') 7 stretch;`+ (team && teamStyle)"
    class="user-pubg-logo"
  >
    <h4 :style="white && `color: white`">{{ text }}</h4>
  </div>
</template>

<script>
export default {
  name: 'UserPubgLogo',
  props: {
    text: {
      type: String,
      default: 'PUBG',
    },
    white: {
      type: Boolean,
      default: false,
    },
    team: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    borderImageSrc () {
      let imgName
      if (this.white) imgName = 'user_pubg_logo_border-white'
      else imgName = 'user_pubg_logo_border'
      // eslint-disable-next-line
      return require(`@/assets/imgs/bg/${
        imgName
      }.svg`)
    },
    teamStyle () {
      return 'height: 60px; min-width: 60px;'
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
  display: inline-flex;
  margin:0;
  padding:0;
  align-items: center;
  h4 {
    padding: 0 0.3rem;
    color: $colorBgLight;
    text-transform: none;
    line-height: 1.4rem;
    width: 100%;
    text-align: center;
  }
}
</style>
