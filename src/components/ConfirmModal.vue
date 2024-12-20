<template>
  <div class="back">
    <div class="container">
      <div class="header">
        <div style="width: 30px; height: 30px; margin: auto; margin-left: 0;"/>
        <h2 class="title">{{ title }}</h2>
        <IconButton icon="times"
                  :dark="true"
                  @click="onCancel"
                  class="close-button"/>
      </div>
      <p class="message">{{ message }}</p>
      <div class="footer">
        <TextButton title="Удалить"
                    :destructive="true"
                    @click="onConfirm"
                    class="action-button"/>
        <TextButton title="Отмена"
                    :destructive="false"
                    @click="onCancel"
                    class="action-button"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from "./IconButton.vue"
import TextButton from "./TextButton.vue"
defineProps<{
  title: string,
  message: string,
  onConfirm:() => void,
  onCancel:() => void
}>()
</script>

<style scoped>
.back {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.container {
  background-color: white;
  border-radius: 8px;
  width: 300px;
  overflow:hidden;
}

.message {
  text-align: center;
  font-size: 1.2rem;
  padding: 1rem;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
}

.title {
  text-align: center;
  font-size: 1.2rem;
}

.close-button {
  margin: auto;
  margin-right: 0;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
}

.action-button {
  margin-right: 5px;
  margin-left: 5px;
}
</style>