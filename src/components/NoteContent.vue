<template>
  <div class="content-wrapper">
    <textarea v-model="_todoTitle"
              class="text-area"
              @input="handleTitleChange"/>
    <label class="validation-label" v-if="validateInputLenght(_todoTitle)">{{ validateInputLenght(_todoTitle) }}</label>
    <div class="custom-checkbox-container">
      <input type="checkbox"
             class="custom-checkbox"
             id="completeCheck"
             v-model="_todoCompleted"
             @input="handleCompletedChange"
      >
      <label class="custom-checkbox-label" for="completeCheck">Сделано</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import capitalizeFirstLetter from "@/utilities/utilities";
import useTodos from "@/hooks/useTodos";

const { newTodoTitle, setNewTodoTitle,newTodoCompleted, setNewTodoCompleted, selectedId, getTodoById } = useTodos()

const _todoTitle = ref<string>(selectedId.value ? capitalizeFirstLetter(getTodoById(selectedId.value).title) : newTodoTitle.value)
const _todoCompleted = ref<boolean>(selectedId.value ? getTodoById(selectedId.value).completed : false)

function handleTitleChange() {
    setNewTodoTitle(_todoTitle.value)
}

function handleCompletedChange() {
  setNewTodoCompleted(!_todoCompleted.value)
  handleTitleChange()
}

function validateInputLenght(value: string | undefined): boolean | string {
  if (!value) {
    return 'Напишите что-нибудь'
  }
  if (value.length < 3) {
    return 'Заметка должна содержать минимум три буквы'
  }
  if (value.length > 50) {
    return 'Заметка должна быть короче 50 букв'
  }
  return false
}

</script>

<style scoped lang="scss">
.content-wrapper {
  display: flex;
  flex-direction: column;
  margin: 5px;
}

.text-area {
  min-height: 100px;
  margin: auto;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 1rem;
  resize: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-style: solid;
  border-color: #c1c7d0;
  border-radius: 8px;
  padding: 0.5rem;
}

.validation-label {
  margin-top: 5px;
  margin-left: 15px;
}


.custom-checkbox-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-left: 15px;
  margin-top: 10px;
}

.custom-checkbox {
  accent-color: $primary-color;
  cursor: pointer;
}

.custom-checkbox-label {
  margin-left: 10px;
}
</style>