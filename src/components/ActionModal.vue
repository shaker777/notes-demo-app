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
      <div v-if="deletion">
        <p class="message">{{ capitalizeFirstLetter(noteTitle())}}</p>
      </div>
      <div class="content-wrapper" v-else>
        <textarea v-model="noteTitle" class="text-area" placeholder="Напишите что-нибудь"/>
        <label class="validation-label" v-if="!valid">{{ validateInputLenght() }}</label>
        <div class="custom-checkbox-container">
          <input type="checkbox"
                 class="custom-checkbox"
                 id="completeCheck"
                 v-model="noteCompleted"
          >
          <label class="custom-checkbox-label" for="completeCheck">Сделано</label>
        </div>
      </div>
      <div class="footer">
        <TextButton :title="actionTitle"
                    :destructive="deletion"
                    @click="deletion ? 'handleDeletion' : 'onClose'"
                    :class="disabled ? 'action-button disabled' : 'action-button'"/>
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
import {capitalizeFirstLetter, validateInputLenght} from "@/utilities/utilities";
import useTodos from "@/hooks/useTodos";

defineProps<{
  title: string,
  actionTitle: string
  onAction:() => void,
  onClose:() => void,
  deletion: boolean
}>()

const { getTodoById, addTodo, newTodoTitle, newTodoCompleted, updateTodo, removeTodo, updateTodoDone, selectedTodoId } = useTodos();

function noteTitle() {
  console.log('banana: ', selectedTodoId.value)
  return selectedTodoId !== undefined ? getTodoById(selectedTodoId).title : newTodoTitle
}

const noteCompleted= () => {
  return selectedTodoId ? getTodoById(selectedTodoId).completed : newTodoCompleted
}

const disabled:boolean = false
const valid:boolean = true

//const existTodo = getTodoById(props.noteId)
//const todo = new TodoModel({id: existTodo.id, title: existTodo.title, completed: existTodo.completed});

function handleDeletion(id:number) {
  removeTodo(id)
  onClose()
}


function handleAction() {
  /*
  if (props.deletion && props.noteId) {
    console.log('delete')
    removeTodo(noteId)
  }
  /*
  else if (noteId) {
    console.log('edit')
    //updateTodo()
  }
  else {
    console.log('add')
    // addTodo()
  }
   */
  //console.log(noteId)
  //onClose()
}
/*
const getNoteTitle = ({
  if (noteId) {
    return capitalizeFirstLetter(getTodoById(noteId).title)
  }
})
*/
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
    min-width: 90%;
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
  margin-top: 5px;
}

.custom-checkbox {
  accent-color: rgb(45, 196, 143);
  cursor: pointer;
}

.custom-checkbox-label {
  margin-left: 10px;
}
</style>