<template>
  <main :class="showFooter ? 'main-container withFooter' : 'main-container noFooter'">
    <div>
      <div>
        <h3 id="process-information" v-if="error">{{ error }}</h3>
        <table-view
        :headers="headers"
        :data="filterCompleted ? todosCompeted : todos"
        :filterCompleted="filterCompleted"
        :delete-item="handleDeleteAction"
        :check-item="handleDoneAction"
        :edit-item="handleEditAction"
        v-else>
          <template #column1="{ entity }">
            <router-link :to="{name: 'note_detail', params: { title: entity.title.replace(/\s/g, '-') }}" active-class="">
              <div @click="onClickNote(entity.id)">
            {{ capitalizeFirstLetter(entity.title) }}
              </div>
            </router-link>
          </template>
        </table-view>
        <Transition name="action">
          <ActionModal  v-if="showEditModal === true"
                      title="Редактирование"
                      action-title="Сохранить"
                      :on-action="handleAction"
                      :on-close="handleCloseEditModal"/>
        </Transition>
        <Transition name="action">
          <ActionModal  v-if="showDeleteModal === true"
                      title="Удаление"
                      action-title="Удалить"
                      :on-action="handleAction"
                      :on-close="handleCloseDeleteModal"/>
        </Transition>
      </div>
    </div>
    <Transition name="detail">
    <NoteView v-if="showDetail"
              :title="selectedId ? capitalizeFirstLetter(getTodoById(selectedId).title) : ''"
              :completed="selectedId ? getTodoById(selectedId).completed : false"/>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { TodoModel } from "@/model/todo-model";
import useSettings from '@/hooks/useSettings'
import useTodos from '@/hooks/useTodos'
import TableView from "./TableView.vue";
import ActionMode from "@/types/enum"
import ActionModal from "./ActionModal.vue";
import { useRoute } from "vue-router";
import capitalizeFirstLetter from "@/utilities/utilities";
import NoteView from "@/components/NoteView.vue";
import { useApi } from '@/hooks/useApi.js'

  const route = useRoute();

  const { showFooter, updateShowAddButton, filterCompleted, updateFilterCompleted, setFilterCompleted, actionMode, setActionMode } = useSettings();
  const { todos, getTodoById, todosCompeted, setTodos, removeTodo, updateTodoDone, updateTodo, selectedId, setSelectedId, newTodoTitle, newTodoCompleted } = useTodos();

  const headers:string[] = ['№', 'Заметка','Сделано', '']

  const showEditModal = ref<boolean>(false)
  const showDeleteModal = ref<boolean>(false)
  const showDetail = ref<boolean>(false)

  const apiUrl = 'https://jsonplaceholder.typicode.com/todos'
  const { data, error } = useApi(apiUrl)

  function onClickNote(id: string) {
    setSelectedId(id)
    updateShowAddButton(false)
    showDetail.value = true
  }

  function handleDeleteAction(id: string) {
    setSelectedId(id)
    setActionMode(ActionMode.Delete)
    showDeleteModal.value = true
  }

  function handleDoneAction(todo:TodoModel) {
    updateTodoDone(todo.id, todo.completed)
  }

  function handleEditAction(id: string) {
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
      setSelectedId(null)
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

  watch(
  () => data.value, async () => {
    if (data.value !== null) {
      setTodos(data.value)
    }

    if (route.fullPath === '/?completed=true') {
      updateFilterCompleted()
    }
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


.detail-enter-active,
.detail-leave-active {
  transition: all 0.25s ease;
}

.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

</style>
