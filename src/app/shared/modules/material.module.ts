import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule, MatRadioModule, MatProgressSpinnerModule, MatSidenavModule, MatGridListModule, MatDividerModule, MatListModule, MatExpansionModule, MatDialogModule, MatChipsModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    FlexLayoutModule
  ]
})
export class MaterialModule { }
