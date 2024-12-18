<template>
  <main :class="showFooter ? 'main-container withFooter' : 'main-container noFooter'">
    <div class="col-md-12">
      <div class="card mb-4 box-shadow">
        <div class="card-body" v-if="isLoading === true">
          <p id="process-information">
            {{ processInformation }}
          </p>
        </div>
        <div id="todos-list" class="card-body" v-else>
          <h2>Todos data:</h2>
          <p v-for="todo in todos" :key="todo.title">
            {{ todo.title }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import {onMounted, ref} from 'vue'
  import {TodoModel} from "@/model/todo-model";
  import useSettings from '@/hooks/useSettings'

  const { showFooter } = useSettings();
  const isLoading = ref<boolean>(true)
  const processInformation = ref<string>('Загрузка данных...')
  const todos = ref<TodoModel>()

  const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  onMounted((): void => {
    axios
    .get(apiUrl)
    .then(async (response): Promise<void | null> => {
        processInformation.value = 'Данные загружены!'

        todos.value = response.data.map(item => {return new TodoModel(item)})
        // console.log(todos)
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

  // height: calc(100vh - 120px);
  // :class="showFooter ? 'main-container withFooter' : 'main-container noFooter'"
</script>

<style scoped>
.main-container {
  width: 100%;
  position: absolute;
  top: 60px;
  display: flex;
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
}
</style>
