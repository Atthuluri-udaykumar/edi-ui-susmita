import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuccessDialogComponent} from './success-dialog/success-dialog.component';
import {DialogModule} from 'primeng-lts/dialog';

@NgModule({
  declarations: [SuccessDialogComponent],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports: [SuccessDialogComponent]
})
export class SuccessDialogModule {
}
