import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-tasks-manage-list-create-item',
  templateUrl: './tasks-manage-list-create-item.component.html',
  styleUrls: ['./tasks-manage-list-create-item.component.scss']
})
export class TasksManageListCreateItemComponent implements OnInit {
  form: FormGroup;
  editable = false;

  @Output() deleteRequst = new EventEmitter<Task>();
  @Output() editRequest = new EventEmitter<Task>();
  @Output() createRequest = new EventEmitter<string>();
  @Input() task: Task;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.maxLength(48)]]
    });
  }

  save() {
    const name = this.form.get('name').value;

    if (this.task) {
      // 编辑
      this.editable = false;

      this.editRequest.next({
        ...this.task,
        name
      });
    } else {
      // 新建
      this.createRequest.next(name);
    }
  }

  delete() {
    this.deleteRequst.next(this.task);
  }

  edit() {
    this.form.setValue({
      name: this.task.name
    });

    this.editable = true;
  }
}
