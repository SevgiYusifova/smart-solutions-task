export interface User {
    id: number;
    username: string;
}

export interface Task {
    id: number;
    assigneeId?: number;
    title: string;
    description: string;
    deadline: Date;
    status: TaskStatus;
}

export enum TaskStatus {
    NotAssigned,
    InProgress,
    Completed,
    Closed
}