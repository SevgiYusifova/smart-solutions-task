import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    deadline: [new Date(), Validators.required]
  })

  users: User[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<AddTaskComponent>) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(data => this.users = data);
  }

  handleSubmit() {
    this.dialogRef.close(this.taskForm.value);
  }

  get title(): FormControl { return this.getControl('title'); }
  get description(): FormControl { return this.getControl('description'); }
  get deadline(): FormControl { return this.getControl('deadline'); }

  private getControl(controlName: string): FormControl {
    return this.taskForm.get(controlName) as FormControl;
  }

}
