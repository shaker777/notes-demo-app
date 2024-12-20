<template>
  <footer id="footer">
    <p>{{title}}</p>
  </footer>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<style scoped>
#footer {
  background: rgb(180 17 17);
  color: #fff;
  padding: 01rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}
</style>