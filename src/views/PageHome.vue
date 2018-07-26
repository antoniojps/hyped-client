<template>
  <BasePage>
    <div class="home">
      <router-link tag="div" to="/login">
        <BaseButton> Login </BaseButton>
      </router-link>
    </div>
  </BasePage>
</template>

<script>
export default {
  name: 'Home',
}
</script>
