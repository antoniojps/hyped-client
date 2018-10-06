<template>
  <div class="nav">
    <div class="nav__top">
      <BaseIcon src="logos/hyped_logo" class="nav__item"/>
      <h4 class="nav__title faded">Hyped arena</h4>

      <router-link
        v-if="user"
        to="/profile"
        class="nav__item"
        tag="div"
        @click.native="handleSelect"
      >
        <BaseButton>
          <UserAvatarWithName/>
        </BaseButton>
      </router-link>

      <router-link
        v-if="!user"
        to="/login"
        class="nav__item"
        tag="div"
      >
        <BaseButton>Login <span class="grey">/ Register</span></BaseButton>
      </router-link>

      <router-link
        v-for="item in items"
        :key="item.link"
        :to="item.link"
        class="nav__item"
        tag="span"
        @click.native="handleSelect"
      >
        <BaseButton>{{ item.text }}</BaseButton>
      </router-link>
      <BaseAuth requires="player">
        <router-link
          to="/teams"
          class="nav__item"
          tag="div"
        >
          <BaseButton>My Teams</BaseButton>
        </router-link>
      </BaseAuth>

      <BaseAuth requires="admin">
        <h4 class="nav__title faded">Manage</h4>
        <router-link
          to="/dashboard"
          class="nav__item"
          tag="div"
        >
          <BaseButton>Events</BaseButton>
        </router-link>
      </BaseAuth>
    </div>
    <div class="nav__bottom">
      <div
        v-if="user"
        class="nav__item button-logout"
      >
        <BaseButton @click.native="handleLogout">Logout</BaseButton>
      </div>
    </div>

  </div>
</template>

<script>
import UserAvatarWithName from '@/components/UserAvatarWithName.vue'
import { eventBus } from '@/main'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { BREAKPOINTS } from '@/config'

export default {
  components: {
    UserAvatarWithName,
  },
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
      ],
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    ...mapMutations('user', ['UPDATE_USER']),
    ...mapActions('user', ['logoutUser']),
    handleSelect () {
      if (document.documentElement.clientWidth <= BREAKPOINTS.md) eventBus.$emit('nav-close')
    },
    async handleLogout () {
      await this.logoutUser()
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';

  .nav {
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    &__top {
      display:flex;
      flex-direction: column;
    }
    &__bottom {
      display:flex;
      flex-direction: column;
      .nav__item {
        margin-bottom: 0;
      }
    }
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
    .button-logout {
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
