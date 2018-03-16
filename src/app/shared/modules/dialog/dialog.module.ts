import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActivityDialogComponent } from './create-activity-dialog/create-activity-dialog.component';
import { DialogUtilService } from './dialog.service';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    CreateActivityDialogComponent,
    ConfirmDialogComponent
  ],
  providers: [
    DialogUtilService
  ],
  entryComponents: [
    CreateActivityDialogComponent,
    ConfirmDialogComponent
  ]
})
export class DialogModule { }
