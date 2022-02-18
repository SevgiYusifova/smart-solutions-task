import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task, TaskStatus, User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-task-manager-page',
  templateUrl: './task-manager-page.component.html',
  styleUrls: ['./task-manager-page.component.scss']
})
export class TaskManagerPageComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    forkJoin({
      users: this.userService.getUsers(),
      tasks: this.userService.getTasks()
    }).subscribe(data => {
      this.users = data.users;
      this.tasks = data.tasks;
    });
  }

  isTaskExpired(deadline: Date) {
    return deadline < new Date();
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed()
      .subscribe(data => {
        if (data) {
          this.userService.addTask({
            id: 0,
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            status: TaskStatus.NotAssigned,
            assigneeId: undefined
          });
        }
      });
  }

  assignTask(taskId: number, userId?: number) { this.userService.assignTask(taskId, userId); }

  openTask(taskId: number) { this.userService.assignTask(taskId); }

  completeTask(taskId: number) { this.userService.completeTask(taskId); }

  closeTask(taskId: number) { this.userService.closeTask(taskId); }

  deleteTask(taskId: number) { this.userService.deleteTask(taskId); }

  getAssignee(task: Task): User | undefined { return this.users.find(u => u.id === task.assigneeId); }
}
