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
        :toogle-filter="handleToggleFilter"
        :delete-item="handleDeleteAction"
        :check-item="handleDoneAction"
        :edit-item="handleEditAction"
        v-else>
          <template #column1="{ entity }">
            {{ capitalizeFirstLetter(entity.title) }}
          </template>
        </table-view>
        <ActionModal  v-if="showEditModal === true"
                      title="Редактирование"
                      action-title="Сохранить"
                      :destructive="false"
                      :on-action="handleCloseEditModal"
                      :on-cancel="handleCloseEditModal">
          <template #content>
            <p class="message">{{selectedItem.title}}</p>
          </template>
        </ActionModal>
        <ActionModal  v-if="showDeleteModal === true"
                      title="Удаление"
                      action-title="Удалить"
                      :destructive="true"
                      :on-action="onDeleteConfirmed"
                      :on-cancel="handleCloseDeleteModal">
          <template #content>
            <p class="message">{{capitalizeFirstLetter(selectedItem.title)}}</p>
          </template>
        </ActionModal>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios'
// import router from '@/router'
import {onMounted, ref, watch} from 'vue'
import {TodoModel} from "@/model/todo-model";
import useSettings from '@/hooks/useSettings'
import useTodos from '@/hooks/useTodos'
import TableView from "./TableView.vue";
import ActionModal from "./ActionModal.vue";
import {useRoute} from "vue-router";
import capitalizeFirstLetter from "@/utilities/utilities";

const route = useRoute();

  const { showFooter, filterCompleted, updateFilterCompleted, setFilterCompleted } = useSettings();
  const isLoading = ref<boolean>(true)
  const processInformation = ref<string>('Загрузка данных...')
  const { todos, getTodoById, todosCompeted, setTodos, removeTodo, updateTodoDone, updateTodo } = useTodos();
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  const headers:string[] = ['№', 'Заметка','Сделано', '']

  const showEditModal = ref<boolean>(false)
  const showDeleteModal = ref<boolean>(false)
  const selectedItem = ref<TodoModel | undefined>()

  function handleToggleFilter () {
    updateFilterCompleted()
    /*
    if (filterCompleted === true) {
      console.log("test filterCompleted on ");
      //router.push({path: '/', query: {completed: 'true'}})
    } else {
      console.log("test filterCompleted off");
      //router.push({path: '/'})
    }
     */
  }
  function handleDeleteAction(id: number) {
    selectedItem.value = getTodoById(id)
    showDeleteModal.value = true
  }

  function onDeleteConfirmed () {
    if (selectedItem.value) {
      removeTodo(selectedItem.value.id)
      showDeleteModal.value = false
    }
  }

  function handleDoneAction(todo:TodoModel) {
    updateTodoDone(todo.id, todo.completed)
  }

  function handleEditAction(id: number) {
    selectedItem.value = getTodoById(id)
    showEditModal.value = true
    //updateTodo(todo)
  }

  function handleCloseEditModal() {
    showEditModal.value = false
    selectedItem.value = undefined
  }

  function handleCloseDeleteModal() {
    showDeleteModal.value = false
    selectedItem.value = undefined
  }

  watch(
  () => route.fullPath,
  async () => {
    console.log("route fullPath updated: ", route.fullPath);
    setFilterCompleted(route.fullPath.includes('completed=true')) // === '/?completed=true'
  }
  );

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

<style scoped>
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

.message {
  text-align: center;
  font-size: 1.2rem;
  padding: 1rem;
}
</style>
