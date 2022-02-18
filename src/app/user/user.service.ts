import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from '../shared/storage.service';
import { Task, TaskStatus, User } from './user.model';

@Injectable()
export class UserService {

  private tasks: Task[] = [
    {
      id: 1,
      assigneeId: 1,
      title: 'Create task manager page.',
      description: 'Create task manager page and fill all fields.',
      deadline: new Date('2022-10-11'),
      status: TaskStatus.InProgress
    },
    {
      id: 2,
      assigneeId: 2,
      title: 'Create auth page.',
      description: 'Create auth page and add validation.',
      deadline: new Date('2022-05-11'),
      status: TaskStatus.Completed
    },
    {
      id: 3,
      title: 'Create admin page.',
      description: 'Create admin page and add some beauty.',
      deadline: new Date('2022-01-11'),
      status: TaskStatus.Closed
    }
  ];

  private users: User[] = [
    {
      id: 1,
      username: 'john_doe'
    },
    {
      id: 2,
      username: 'jane_doe'
    },
    {
      id: 3,
      username: 'josh_doe'
    }
  ];

  constructor(private storageService: StorageService) {
    const user = this.storageService.getUserCredentials();
    if (user) {
      this.users.push({ id: 4, username: user.username });
    }
  }

  getUsers() {
    return of(this.users);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  assignTask(taskId: number, userId?: number) {
    const taskIndex = this.getTaskIndex(taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = userId ? TaskStatus.InProgress : TaskStatus.NotAssigned;

      this.tasks[taskIndex].assigneeId = userId;
    }
  }

  completeTask(taskId: number) {
    const taskIndex = this.getTaskIndex(taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = TaskStatus.Completed;
    }
  }

  closeTask(taskId: number) {
    const taskIndex = this.getTaskIndex(taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = TaskStatus.Closed;

      this.tasks[taskIndex].assigneeId = undefined;
    }
  }

  addTask(task: Task) {
    if (this.tasks?.length)
      task.id = this.tasks[this.tasks.length - 1].id + 1
    else
      task.id = 1;

    this.tasks.push(task);
  }

  deleteTask(taskId: number) {
    const index = this.getTaskIndex(taskId);

    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  private getTaskIndex(taskId: number): number {
    return this.tasks.findIndex(t => t.id === taskId);
  }
}
