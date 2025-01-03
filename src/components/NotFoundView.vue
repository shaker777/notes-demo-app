<template>
  <div class="container">
    <h1>Ничего не найдено :(</h1>
    <router-link :to="{name: 'home'}">
      <label class="back-link">к списку заметок</label>
    </router-link>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  flex-direction: column;
  @include center
}
</style>