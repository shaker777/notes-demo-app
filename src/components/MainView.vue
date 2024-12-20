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
        <ConfirmModal  v-if="showConfirmModal === true"
                       title="Удаление"
                       message="Удалить заметку?"
                       :on-confirm="onDeleteConfirmed"
                       :on-cancel="handleCloseConfirmModal"/>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import {onMounted, ref} from 'vue'
  import {TodoModel} from "@/model/todo-model";
  import useSettings from '@/hooks/useSettings'
  import useTodos from '@/hooks/useTodos'
  import TableView from "./TableView.vue";
  import ConfirmModal from "./ConfirmModal.vue";
  // import router from '@/router'
  import { watch } from "vue";
  import { useRoute } from "vue-router";
  import capitalizeFirstLetter from "@/utilities/utilities";

  const route = useRoute();

  const { showFooter, filterCompleted, updateFilterCompleted, setFilterCompleted } = useSettings();
  const isLoading = ref<boolean>(true)
  const processInformation = ref<string>('Загрузка данных...')
  const { todos, todosCompeted, setTodos, removeTodo, updateTodoDone, updateTodo } = useTodos();
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  const headers:string[] = ['№', 'Заметка','Сделано', '']

  const showConfirmModal = ref<boolean>(false)
  const itemToDeleteId = ref<number | undefined>()

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
  function handleDeleteAction(todoId: number) {
    showConfirmModal.value = true
    itemToDeleteId.value = todoId
  }

  function onDeleteConfirmed () {
    if (itemToDeleteId.value) {
      removeTodo(itemToDeleteId.value)
      showConfirmModal.value = false
    }
  }

  function handleDoneAction(todo:TodoModel) {
    updateTodoDone(todo.id, todo.completed)
  }

  function handleEditAction(todoId: number) {
    console.log('handleEditAction: ', todoId)
    //updateTodo(todo)
  }

  function handleCloseConfirmModal() {
    showConfirmModal.value = false
    itemToDeleteId.value = undefined
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
</style>
