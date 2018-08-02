<template>
  <div class="nav">
    <BaseIcon src="logos/hyped_logo" class="nav__item"/>
    <h4 class="nav__title faded">Hyped arena</h4>

    <router-link
      v-if="!user"
      to="/login"
      class="nav__item"
      tag="div"
    >
      <BaseButton>Login</BaseButton>
    </router-link>

    <router-link
      v-for="item in items"
      :key="item.link"
      :to="item.link"
      class="nav__item"
      tag="div"
      @click.native="handleSelect"
    >
      <BaseButton>{{ item.text }}</BaseButton>
    </router-link>

    <router-link
      v-if="user"
      to="/"
      class="nav__item router-link-disable"
      tag="div"
      @click.native="handleLogout"
    >
      <BaseButton>Logout</BaseButton>
    </router-link>

  </div>
</template>

<script>
import { eventBus } from '@/main'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      items: [
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
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    ...mapMutations('user', ['UPDATE_USER']),
    handleSelect () {
      eventBus.$emit('nav-close')
    },
    handleLogout () {
      this.UPDATE_USER(null)
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

    .router-link-exact-active {
      .el-button {
        border-color: $colorActive;
        background-color: $colorActive;
      }
    }
    .router-link-disable.router-link-exact-active {
        .el-button {
        border-color: $colorBase6;
        background-color: $colorBase6;
        color: $colorBase4;
          &:hover {
            border-color: darken($colorBgLight,10%);
            background-color: darken($colorBgLight,10%);
          }
        }
      }
  }
</style>
