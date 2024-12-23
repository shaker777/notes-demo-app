import type {TodoModel} from '@/model/todo-model'

export type TodoState = {
    todo: TodoModel | null;
    todos: TodoModel[];
    selectedId: number | null;
    newTodoTitle: string;
    newTodoCompleted: boolean;
}