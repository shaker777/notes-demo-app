<template>
  <main :class="showFooter ? 'main-container withFooter' : 'main-container noFooter'">
    <div>
      <div>
        <div v-if="isLoading === true">
          <p id="process-information">
            {{ processInformation }}
          </p>
        </div>
        <table-view
        :headers="headers"
        :data="filterCompleted? todosCompeted: todos"
        :filterCompleted="filterCompleted"
        :delete-item="handleDeleteAction"
        :check-item="handleDoneAction"
        :edit-item="handleEditAction"
        v-else>
          <template #column1="{ entity }">
            <router-link :to="{name: 'note_detail', params: { id: entity.id }}" active-class="">
              <div @click="onClickNote(entity.id)">
            {{ capitalizeFirstLetter(entity.title) }}
              </div>
            </router-link>
          </template>
        </table-view>
        <ActionModal  v-if="showEditModal === true"
                      title="Редактирование"
                      action-title="Сохранить"
                      :on-action="handleAction"
                      :on-close="handleCloseEditModal"/>
        <ActionModal  v-if="showDeleteModal === true"
                      title="Удаление"
                      action-title="Удалить"
                      :on-action="handleAction"
                      :on-close="handleCloseDeleteModal"/>
      </div>
    </div>
    <NoteView v-if="showDetail"
              :title="selectedId ? capitalizeFirstLetter(getTodoById(selectedId).title) : ''"
              :completed="selectedId ? getTodoById(selectedId).completed : false"/>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios'
import router from '@/router'
import {onMounted, ref, watch} from 'vue'
import {TodoModel} from "@/model/todo-model";
import useSettings from '@/hooks/useSettings'
import useTodos from '@/hooks/useTodos'
import TableView from "./TableView.vue";
import ActionMode from "@/types/enum"
import ActionModal from "./ActionModal.vue";
import {useRoute} from "vue-router";
import capitalizeFirstLetter from "@/utilities/utilities";
import NoteView from "@/components/NoteView.vue";

  const route = useRoute();

  const { showFooter, updateShowAddButton, filterCompleted, updateFilterCompleted, setFilterCompleted, actionMode, setActionMode } = useSettings();
  const isLoading = ref<boolean>(true)
  const processInformation = ref<string>('Загрузка данных...')
  const { todos, getTodoById, todosCompeted, setTodos, removeTodo, updateTodoDone, updateTodo, selectedId, setSelectedId, newTodoTitle, newTodoCompleted } = useTodos();
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  const headers:string[] = ['№', 'Заметка','Сделано', '']

  const showEditModal = ref<boolean>(false)
  const showDeleteModal = ref<boolean>(false)
  const showDetail = ref<boolean>(false)

  function onClickNote(id: number) {
    setSelectedId(id)
    updateShowAddButton(false)
    showDetail.value = true
  }

  function handleDeleteAction(id: number) {
    setSelectedId(id)
    setActionMode(ActionMode.Delete)
    showDeleteModal.value = true
  }

  function handleDoneAction(todo:TodoModel) {
    updateTodoDone(todo.id, todo.completed)
  }

  function handleEditAction(id: number) {
    setSelectedId(id)
    setActionMode(ActionMode.Update)
    showEditModal.value = true
  }

function onDone() {
  if (selectedId.value) {
    const selected = getTodoById(selectedId.value)
    const data = {id : selected.id, title: newTodoTitle.value, completed: newTodoCompleted.value}
    const todo = new TodoModel(data)
    updateTodo(todo)
    showEditModal.value = false
    setSelectedId(null)
  }
}

  function handleCloseEditModal() {
    showEditModal.value = false
    setSelectedId(null)
  }

  function handleCloseDeleteModal() {
    showDeleteModal.value = false
    setSelectedId(null)
  }

  function onDeleteConfirmed () {
    if (selectedId.value) {
      removeTodo(selectedId.value)
      showDeleteModal.value = false
    }
  }

  function handleAction() {
    switch (actionMode.value) {
      case ActionMode.Update:
        onDone()
        break;
      case ActionMode.Delete:
        onDeleteConfirmed()
        break;
      default:
        break;
    }
  }

  watch(
  () => route.fullPath,
  async () => {
    // console.log("Main route fullPath updated: ", route.fullPath);
    setFilterCompleted(route.fullPath.includes('completed=true'))

    if (route.fullPath === '/' || route.fullPath.includes('completed=true')) {
      setSelectedId(null)
      showDetail.value = false
      updateShowAddButton(true)
    }
  });

  onMounted((): void => {
    axios
    .get(apiUrl)
    .then(async (response): Promise<void | null> => {
        processInformation.value = 'Данные загружены!'

      const td = response.data.map((item:any) => {return new TodoModel(item)})
      setTodos(td)
      if (route.fullPath === '/?completed=true') {
        updateFilterCompleted()
      }
    })
    .then(async (): Promise<void | null> => {
        processInformation.value = 'Обработка данных'
    })
    .then((): void => {
        isLoading.value = false
    })
    .catch(error => {
      console.log(error)
      processInformation.value = `Не удалось загрузить заметки. Ошибка: ${error.message}`
    })
  })

</script>

<style>
a {
  color: black;
  padding: 0;
}
a:hover {
  background-color: unset;
}
</style>

<style scoped>

a {
  cursor: pointer;
}
.main-container {
  width: 100%;
  position: absolute;
  top: 60px;
  justify-content: center;
  overflow: scroll;
}

.withFooter {
  height: calc(100vh - 120px);
}

.noFooter {
  height: calc(100vh - 60px);
}

#process-information {
  padding-top: 30px;
  text-align: center;
}

</style>
