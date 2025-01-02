import {ref, computed} from 'vue'
import {TodoModel} from '@/model/todo-model'
import {useTodoStore} from '@/stores/todo'
import { v4 as uuidv4 } from "uuid";

export default function useTodos() {
    const store = useTodoStore()

    const newTodoTitle = computed(() => store.getNewTodoTitle)
    const setNewTodoTitle = (value:string): void => {
        store.setNewTodoTitle(value)
    }

    const newTodoCompleted = computed(() => store.getNewTodoCompleted)
    const setNewTodoCompleted = (value:boolean): void => {
        store.setNewTodoCompleted(value)
    }

    const valid = computed(() => store.getNewTodoTitle.length > 2 && store.getNewTodoTitle.length < 51)

    const todos = computed(() => store.getTodos)

    const todosCompeted = computed(() => store.getTodos.filter(item => item.completed))

    const getNewId = (): string => {
        return uuidv4()
    }

    const addTodo = (): void => {
        const title = newTodoTitle.value && newTodoTitle.value.trim()
        if (!title) {
            return
        }
        const data = {id : getNewId(), title, completed: newTodoCompleted.value}
        const payload = new TodoModel(data)
        store.addTodo(payload)
        setNewTodoTitle('')
        setNewTodoCompleted(false)
    }

    const removeTodo = (id: number | undefined): void => {
        if (id) {
            store.removeTodo(id)
        }
    }

    const updateTodo = (todo: TodoModel): void => {
        store.updateTodo(todo)
        setNewTodoTitle('')
        setNewTodoCompleted(false)
    }

    const setTodos = (todos: TodoModel[]): void => {
        store.setTodos(todos)
    }

    const updateTodoDone = (id: string, done: boolean): void => {
        store.updateTodoDone({id: id, done: done})
    }

    const getTodoById = (id: string): TodoModel => {
        store.getTodoById(id)
        const todo: TodoModel | null = store.getTodo

        if (todo === null) {
            throw Error('todo cant be null.')
        }
        return todo
    }

    const selectedId = computed(() => store.getSelectedId)

    const setSelectedId = (value:string | null): void => {
        store.setSelectedId(value)
    }

    return {
        setTodos,
        addTodo,
        newTodoTitle,
        setNewTodoTitle,
        newTodoCompleted,
        setNewTodoCompleted,
        updateTodo,
        updateTodoDone,
        removeTodo,
        todos,
        todosCompeted,
        getTodoById,
        valid,
        selectedId,
        setSelectedId
    }
}
