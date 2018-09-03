<template>
  <div class="login-modal">
    <ul>
      <li
        v-for="provider in providers"
        :key="provider.name"
        class="paddingBottom"
        @click="$emit('before-login', provider)"
      >
        <BaseIcon :src="provider.icon" class="paddingRight"/>
        <BaseButton :type="provider.btnType" :costum-color="provider.btnColor">
          Continue with
          <b>{{ provider.name }}</b>
        </BaseButton>
      </li>
    </ul>
    <p class="size-sm grey">By signing in or creating an account, you agree to the terms and conditions & privacy policy. We need this information to ensure that you can use the service, to be able to contact you and to prevent cheating or fraud.</p>
  </div>
</template>

<script>

export default {
  name: 'UserLoginModal',
  data: function () {
    return {
      providers: [
        {
          icon: 'providers/logo-discord',
          name: 'Discord',
          link: '/auth/discord',
          btnColor: '#7189da',
          btnType: '',
        },
        {
          icon: 'providers/logo-steam',
          name: 'Steam',
          link: '/auth/steam',
        },
        {
          icon: 'providers/logo-google',
          name: 'Google',
          link: '/auth/google',
          btnType: 'danger',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.login-modal {
  @include screen(md) {
    max-width: 260px;
  }
  h1 {
    margin-bottom: $spacingLSmall;
    @include screen(sm){
      margin-bottom: $spacingBase;
    }
  }
  ul {
    list-style-type: none;
    display:flex;
    flex-direction: column;
    align-content:stretch;
    li {
      display: flex;
    }
  }
}
</style>
