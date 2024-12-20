<template>
  <header id="header">
    <div>
      <IconButton icon="info"
                  :dark="false"
                  @click="updateShowFooter"/>
    </div>
    <h1 class="title">{{title}}</h1>
    <div>
      <IconButton icon="plus"
                  :dark="false"
                  @click="showAddNoteModal"/>
    </div>
  </header>
</template>

<script setup lang="ts">
import useSettings from '@/hooks/useSettings'
import IconButton from "./IconButton.vue"

  defineProps<{
    title: string,
    showAddNoteModal:() => void
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
  z-index: 100;
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