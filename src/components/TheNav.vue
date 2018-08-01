<template>
  <div class="nav">
    <BaseIcon src="logos/hyped_logo" class="nav__item"/>
    <h4 class="nav__title faded">Hyped arena</h4>
    <router-link
      v-for="item in items"
      :key="item.link"
      :to="item.link"
      class="nav__item"
      tag="div"
    >
      <BaseButton>{{ item.text }}</BaseButton>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          link: '/login',
          text: 'Login',
        },
        {
          link: '/',
          text: 'Home',
        },
        {
          link: '/events',
          text: 'Events',
        },
        {
          link: '/scrims',
          text: 'Scrims',
        },
        {
          link: '/myteams',
          text: 'My teams',
        },
      ],
    }
  },
  methods: {
    handleSelect () {
      console.log('handle select')
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';

  .nav {
    display:flex;
    flex-direction:column;
    &__item {
      margin-bottom: $sizeSmall;
      text-align: left;
      .el-button {
          width: 100%;
      }
    }
    &__title {
      padding-bottom: $spacingSmall;
    }
    .el-button {
      text-align:left;
      background-color: $colorBg;
      border-color: $colorBg;
    }
    .el-button:hover, .el-button:focus {
      color: #FFFFFF;
      border-color: $colorBgLight;
      background-color: $colorBgLight;
    }
    .el-button:active {
      color: #FFFFFF;
      border-color: $colorBg;
      background-color: $colorBg;
    }

    .router-link-active {
      .el-button {
        border-color: $colorActive;
        background-color: $colorActive;
      }
    }
  }
</style>
