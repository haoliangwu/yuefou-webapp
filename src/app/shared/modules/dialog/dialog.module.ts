import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActivityDialogComponent } from './create-activity-dialog/create-activity-dialog.component';
import { DialogUtilService } from './dialog.service';
import { MatDialogModule, MatButtonModule, MatInputModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AttendActivityComponent } from './attend-activity/attend-activity.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule
  ],
  declarations: [
    CreateActivityDialogComponent,
    ConfirmDialogComponent,
    AttendActivityComponent
  ],
  providers: [
    DialogUtilService
  ],
  entryComponents: [
    CreateActivityDialogComponent,
    ConfirmDialogComponent,
    AttendActivityComponent
  ]
})
export class DialogModule { }
