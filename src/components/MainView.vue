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
        v-else>
          <template #column0="{ entity }">
            {{ entity.id }}
          </template>
          <template #column1="{ entity }">
            {{ entity.title }}
          </template>
          <template #column2="{ entity }">
            {{ entity.completed }}
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
  // import router from '@/router'
  import { watch } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();

  const { showFooter, filterCompleted, updateFilterCompleted, setFilterCompleted } = useSettings();
  const isLoading = ref<boolean>(true)
  const processInformation = ref<string>('Загрузка данных...')
  const { todos, todosCompeted, setTodos } = useTodos();
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  const headers:string[] = ['№', 'Название','Сделано', 'Actions']

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

  watch(
  () => route.fullPath,
  async () => {
    console.log("route fullPath updated: ", route.fullPath);
    setFilterCompleted(route.fullPath === '/?completed=true' )
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
