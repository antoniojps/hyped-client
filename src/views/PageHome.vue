<template>
  <BasePage>
    <template slot="header">
      <h1>Hyped arena</h1>
    </template>
    <div class="home">
      <BaseAuth>
        <p>Utilizador logado.</p>
      </BaseAuth>
      <BaseAuth requires="admin">
        <p>Utilizador ADMIN.</p>
      </BaseAuth>
      <BaseAuth requires="moderator">
        <p>Utilizador MODERADOR.</p>
      </BaseAuth>
    </div>

  </BasePage>
</template>

<script>
export default {
  name: 'Home',
}
</script>
