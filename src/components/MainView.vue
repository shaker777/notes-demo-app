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
                      :deletion="false"
                      :on-close="handleCloseEditModal"/>
        <ActionModal  v-if="showDeleteModal === true"
                      title="Удаление"
                      action-title="Удалить"
                      :deletion="true"
                      :on-action="onDeleteConfirmed"
                      :on-close="handleCloseDeleteModal"/>
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
import {capitalizeFirstLetter} from "@/utilities/utilities";

const route = useRoute();

  const { showFooter, filterCompleted, updateFilterCompleted, setFilterCompleted } = useSettings();
  const isLoading = ref<boolean>(true)
  const processInformation = ref<string>('Загрузка данных...')
  const { todos, getTodoById, todosCompeted, setTodos, removeTodo, updateTodoDone, updateTodo, selectedTodoId } = useTodos();
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  const headers:string[] = ['№', 'Заметка','Сделано', '']

  const showEditModal = ref<boolean>(false)
  const showDeleteModal = ref<boolean>(false)
  // const selectedTodoId = ref<number | undefined>()

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

  function handleEditAction(id: number) {
    selectedTodoId.value = id
    showEditModal.value = true
  }

function handleCloseEditModal() {
  selectedTodoId.value = undefined
  showEditModal.value = false
}

  function handleDeleteAction(id: number) {
    console.log('foo: ', id)
    selectedTodoId.value = id
    console.log('bar: ', selectedTodoId.value)
    showDeleteModal.value = true
  }

function handleCloseDeleteModal() {
  selectedTodoId.value = undefined
  showDeleteModal.value = false
}

  function handleDoneAction(todo:TodoModel) {
    updateTodoDone(todo.id, todo.completed)
  }

function onDeleteConfirmed () {
  if (selectedTodoId.value) {
    //removeTodo(selectedTodoId.value)
    showDeleteModal.value = false
  }
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
