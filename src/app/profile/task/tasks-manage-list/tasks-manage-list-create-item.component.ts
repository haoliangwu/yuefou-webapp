import * as R from 'ramda';

import { Component, OnInit, EventEmitter, Input, Output, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Task } from '../../../model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../task.service';
import { TasksManageListComponent } from './tasks-manage-list.component';
import { isNilOrEmpty } from '../../../utils';


@Component({
  selector: 'app-tasks-manage-list-create-item',
  templateUrl: './tasks-manage-list-create-item.component.html',
  styleUrls: ['./tasks-manage-list-create-item.component.scss']
})
export class TasksManageListCreateItemComponent implements OnInit {
  form: FormGroup;
  editable = false;

  @Input() task: Task;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private tasksManageListComp: TasksManageListComponent,
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.maxLength(48)]]
    });
  }

  save() {
    const nameControl = this.form.get('name');
    const name = nameControl.value;

    // 如果为空需要进行提示
    if (isNilOrEmpty(name)) {
      nameControl.setErrors({
        required: true
      });
      return;
    }

    if (this.task) {
      // 编辑
      this.editable = false;

      this.tasksManageListComp.edit({ ...this.task, name });
    } else {
      // 新建
      this.tasksManageListComp.create({ name });
    }
  }

  delete() {
    this.tasksManageListComp.delete(this.task);
  }

  edit() {
    this.form.setValue({
      name: this.task.name
    });

    this.editable = true;

    // 需要手动触发一次脏检查 以使 input 显示在 dom 上
    this.changeDetectorRef.detectChanges();

    // 编辑时 autofocus
    const input = (this.el.nativeElement as HTMLElement).querySelector('input');

    input.focus();
  }
}
