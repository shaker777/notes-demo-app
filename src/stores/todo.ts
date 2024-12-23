import type {TodoState} from './type/todo'
import {TodoModel} from '@/model/todo-model'
import {defineStore} from 'pinia'
import {computed, reactive} from 'vue'

export const useTodoStore = defineStore('todo', () => {
    const state = reactive<TodoState>({
        todo: null,
        todos: [],
        selectedId: null,
        newTodoTitle: '',
        newTodoCompleted: false
    }) as TodoState

    const getTodo = computed((): TodoModel | null => state.todo)
    const getTodos = computed((): TodoModel[] => state.todos)
    const getNewId = computed((): number => state.todos.slice(-1)[0]['id'] + 1)

    const getTodoById = (todoModelId: number): void => {
        const todo: TodoModel | undefined = state.todos.find((t: TodoModel): boolean => t.id === todoModelId)
        if (!todo) {
            return
        }

        setTodo(todo)
    }

    const addTodo = (todoModel: TodoModel): void => {
        state.todos = [todoModel, ...state.todos]
    }

    const setTodo = (todoModel: TodoModel): void => {
        state.todo = todoModel
    }

    const setTodos = (todos: TodoModel[]): void => {
        state.todos = todos
    }

    const removeTodo = (todoModelId: number): void => {
        const index = state.todos.findIndex(todo => todo.id === todoModelId)
        state.todos.splice(index, 1)
    }

    const updateTodo = (todoModel: TodoModel): void => {
        const index = state.todos.findIndex(todo => todo.id === todoModel.id)
        state.todos[index] = todoModel
    }
    const updateTodoDone = (todoModel: { id: number; done: boolean }): void => {
        const index = state.todos.findIndex(todo => todo.id === todoModel.id)
        state.todos[index].completed = todoModel.done
    }

    const getSelectedId = computed((): number | null => state.selectedId)

    function setSelectedId(value:number | null): void {
        state.selectedId = value
    }

    const getNewTodoTitle = computed((): string => state.newTodoTitle)

    function setNewTodoTitle(value:string): void {
        state.newTodoTitle = value
    }

    const getNewTodoCompleted = computed((): boolean => state.newTodoCompleted)

    function setNewTodoCompleted(value:boolean): void {
        state.newTodoCompleted = value
    }

    return {
        getTodo,
        getTodos,
        getNewId,
        getTodoById,
        addTodo,
        setTodo,
        setTodos,
        removeTodo,
        updateTodo,
        updateTodoDone,
        getSelectedId,
        setSelectedId,
        getNewTodoTitle,
        setNewTodoTitle,
        getNewTodoCompleted,
        setNewTodoCompleted
    }
})
