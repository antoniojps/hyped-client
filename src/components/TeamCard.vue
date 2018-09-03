<template>
  <div class="team">
    <div class="team__logo">
      <TeamLogo :shortname="shortname" :logo="logo"/>
    </div>
    <div class="team__name">
      <h4>{{ name }}</h4>
    </div>
    <div class="team__shortname">
      <TeamShortname :shortname="shortname"/>
    </div>
  </div>
</template>

<script>
import TeamShortname from '@/components/TeamShortname.vue'
import TeamLogo from '@/components/TeamLogo.vue'

export default {
  name: 'TeamCard',
  components: {
    TeamShortname,
    TeamLogo,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    shortname: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

.team {
  display:flex;
  align-items:center;
  border: $sizeXSmall/2 solid $colorBgLight;
  border-radius: $sizeXSmall;
  padding: $spacingLSmall $spacingMSBase;
  &__name {
    padding-right: $spacingLSmall;
  }
  &__logo {
    width: 60px;
    height: 60px;
    margin-right: $spacingLSmall;
  }
}
</style>
