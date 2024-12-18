<template>
  <header id="header">
    <h1>{{title}}</h1>
  </header>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()

</script>

<style>
#header {
  background: rgb(45, 196, 143);
  color: #fff;
  padding: 1rem;
  width: 100%;
  position: fixed;
  top: 0;
  margin: 0;
  height: 60px;
  z-index: 999;
}

.title {
  font-weight: bold;
}
</style>