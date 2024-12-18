export class TodoModel {
    public id: number;
    public title: string;
    public completed: boolean;
    public description?: string;
    constructor(item: TodoModel) {
        this.id = item.id;
        this.title = item.title;
        this.completed = item.completed;
        this.description = item.description;
    }
}