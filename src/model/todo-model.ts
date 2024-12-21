export class TodoModel {
    public id: number;
    public title: string;
    public completed: boolean;
    constructor(item: any) {
        this.id = item.id;
        this.title = item.title;
        this.completed = item.completed;
    }
}