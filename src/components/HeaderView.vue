<template>
  <header id="header">
    <h1 class="title">{{title}}</h1>
    <div>
      <input type="button"
             class="button"
             @click="updateShowFooter"
             value="show footer"
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import useSettings from '@/hooks/useSettings'

  defineProps<{
    title: string
  }>()

const { updateShowFooter } = useSettings();

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: bold;
}

.button {
}
</style>