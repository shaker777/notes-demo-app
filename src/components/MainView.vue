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
        :data="todos"
        v-else>
          <template #column0="{ entity }">
            {{ entity.id }}
          </template>
          <template #column1="{ entity }">
            {{ entity.title }}
          </template>
          <template #column2="{ entity }">
            <li v-for="(complete, i) in entity.comlete" :key="`${complete}-${i}`">
              {{ complete }}
            </li>
          </template>
        </table-view>
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

  const { showFooter } = useSettings();
  const isLoading = ref<boolean>(true)
  const processInformation = ref<string>('Загрузка данных...')
  const { todos, setTodos } = useTodos();
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  const headers:string[] = ['№', 'Название','Сделано', 'Actions']

  onMounted((): void => {
    axios
    .get(apiUrl)
    .then(async (response): Promise<void | null> => {
        processInformation.value = 'Данные загружены!'

      const td = response.data.map(item => {return new TodoModel(item)})
      setTodos(td)
      // console.log(td)
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
