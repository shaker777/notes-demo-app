<template>
  <div class="container">
    <label class="back-link" @click="$router.back()">< к списку</label>
    <label id="title"> {{ title }}</label>
    <div id="status-container">
      <label id="status-label">Статус:</label>
      <label id="status-value">{{ completed? 'готово!' : 'еще не сделано'}}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  completed: boolean
}>()

</script>

<style scoped>
  .container {
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: white;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  #title {
    margin-top: 15px;
    font-size: 1.7rem;
  }

  #status-container {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
  }

  #status-label {
    font-size: 1.2rem;
    font-weight: bold;
  }

  #status-value {
    font-size: 1.2rem;
    margin-left: 10px;
  }
</style>