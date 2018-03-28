import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tasks-manage-list',
  templateUrl: './tasks-manage-list.component.html',
  styleUrls: ['./tasks-manage-list.component.scss']
})
export class TasksManageListComponent implements OnInit {
  form: FormGroup;

  @Input() tasks: Task[];
  @Output() tasksChange = new EventEmitter<Task[]>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.maxLength(48)]]
    });
  }
}
