import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Route } from '@angular/router';
import { TaskComponent } from './task.component';
import { TaskService } from './task.service';
import { TaskBriefDetailComponent } from './task-brief-detail.component';
import { AvaliableOperationPipe } from './pipes/avaliable-operation.pipe';
import { TaskOperationService } from './task-operation.service';

export const TaskRoute: Route = {
  path: 'task',
  children: [
    {
      path: 'list',
      component: TaskComponent
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
  ]
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    TaskComponent,
    TaskBriefDetailComponent,
    AvaliableOperationPipe
  ],
  providers: [
    TaskService
    TaskOperationService
  ],
  exports: [
    AvaliableOperationPipe
  ]
})
export class TaskModule { }
