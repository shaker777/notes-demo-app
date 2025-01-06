import axios from 'axios'

// const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

import { ref } from 'vue'

export function useApi(url:any) {
    const data = ref(null)
    const error = ref('Загрузка данных...')

    axios
        .get(url)
        .then(async (response): Promise<void | null> => {
            data.value = response.data
            //@ts-ignore
            error.value = null
        })
        .catch(err => {
            error.value = `Не удалось загрузить заметки. Ошибка: ${err.message}`
        })

    return { data, error }
}