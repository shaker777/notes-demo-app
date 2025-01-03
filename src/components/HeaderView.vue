<template>
  <header id="header">
    <div>
      <IconButton icon="snowflake"
                  :dark="false"
                  @click="updateShowFooter"/>
    </div>
    <h1 class="title">{{title}}</h1>
    <div v-if="showAddButton">
      <IconButton icon="plus"
                  :dark="false"
                  @click="showAddNoteModal"/>
    </div>
    <div style="width: 30px; height: 30px;" v-else/>
  </header>
</template>

<script setup lang="ts">
import useSettings from '@/hooks/useSettings'
import IconButton from "./IconButton.vue"

  defineProps<{
    title: string,
    showAddNoteModal:() => void
  }>()

const { updateShowFooter, showAddButton } = useSettings();

</script>

<style scoped lang="scss">
#header {
  background: $primary-color;
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