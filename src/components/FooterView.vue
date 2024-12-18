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

<style>
#footer {
  background: #b8ecda;
  color: #000000;
  padding: 01rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  z-index: 999;
}
</style>