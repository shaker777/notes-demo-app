<template>
  <div class="back">
    <div class="container">
      <div class="header">
        <div style="width: 30px; height: 30px; margin: auto; margin-left: 0;"/>
        <h2 class="title">{{ title }}</h2>
        <IconButton icon="times"
                  :dark="true"
                  @click="onClose"
                  class="close-button"/>
      </div>
      <div v-if="actionMode === 2">
        <p class="message">{{capitalizeFirstLetter(getTodoById(selectedId).title)}}</p>
      </div>
      <div v-else>
        <NoteContent :title="newTodoTitle" :completed="newTodoCompleted"/>
      </div>
      <div class="footer">
        <TextButton :title="actionTitle"
                    :destructive="actionMode === 2"
                    @click="onAction"
                    :class="(actionMode === 2 || valid) ? 'action-button' : 'action-button action-button-disabled'"/>
        <TextButton title="Отмена"
                    :destructive="undefined"
                    @click="onClose"
                    class="action-button"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from "./IconButton.vue"
import TextButton from "./TextButton.vue"
import useTodos from "@/hooks/useTodos";
import useSettings from "@/hooks/useSettings";
import capitalizeFirstLetter from "@/utilities/utilities";
import NoteContent from "@/components/NoteContent.vue";
const { actionMode } = useSettings()
const { addTodo, newTodoTitle, newTodoCompleted, valid, removeTodo, selectedId, getTodoById } = useTodos()

defineProps<{
  title: string,
  actionTitle: string,
  onAction:() => void,
  onClose:() => void,
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
  overflow:hidden;
  min-width: 50%;
  max-width: 95%;
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 600px) {
  .container {
    min-width: 95%;
  }
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

.action-button-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  text-align: center;
  font-size: 1.2rem;
  padding: 1rem;
}

</style>