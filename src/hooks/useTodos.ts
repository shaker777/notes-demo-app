import {ref, computed} from 'vue'
import {TodoModel} from '@/model/todo-model'
import {useTodoStore} from '@/stores/todo'

export default function useTodos() {
    const store = useTodoStore()
    const newTodoTitle = ref<string>('')
    const newTodoCompleted = ref<boolean>(false)

    const todos = computed(() => store.getTodos)

    const todosCompeted = computed(() => store.getTodos.filter(item => item.completed))

    let selectedTodoId = ref<number | undefined>()

    const getNewId = (): number => {
        const todosSlice = store.getTodos.slice(-1)
        if (todosSlice.length > 0) {
            return store.getTodos.slice(-1)[0]['id'] + 1
        }

        return 1
    }

    const addTodo = (): void => {
        const title = newTodoTitle.value && newTodoTitle.value.trim()
        if (!title) {
            return
        }
        const data = {id : getNewId(), title, completed: newTodoCompleted.value}
        const payload = new TodoModel(data)
        store.addTodo(payload)
        newTodoTitle.value = ''
        newTodoCompleted.value = false
    }

    const removeTodo = (id: number | undefined): void => {
        if (id) {
            store.removeTodo(id)
        }
    }

    const updateTodo = (todo: TodoModel): void => {
        store.updateTodo(todo)
    }

    const setTodos = (todos: TodoModel[]): void => {
        store.setTodos(todos)
    }

    const updateTodoDone = (id: number, done: boolean): void => {
        store.updateTodoDone({id: id, done: done})
    }

    const getTodoById = (id: number): TodoModel => {
        store.getTodoById(id)
        const todo: TodoModel | null = store.getTodo

        if (todo === null) {
            throw Error('todo cant be null.')
        }
        return todo
    }

    return {
        setTodos,
        addTodo,
        newTodoTitle,
        newTodoCompleted,
        updateTodo,
        updateTodoDone,
        removeTodo,
        todos,
        todosCompeted,
        getTodoById,
        selectedTodoId
    }
}
