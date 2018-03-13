import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule, MatRadioModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FlexLayoutModule
  ]
})
export class MaterialModule { }
