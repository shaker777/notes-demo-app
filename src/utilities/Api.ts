import axios from 'axios'
import {TodoModel} from "@/model/todo-model";

const apiUrl = 'https://jsonplaceholder.typicode.com/todos'
/*
export function getData() {
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
}
*/