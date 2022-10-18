import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng-lts/dialog';
import {GeneralModule} from '../general/general.module';
import {InputMaskModule} from 'primeng-lts/inputmask';
import {TextNumberComponent} from './text-number/text-number.component';

@NgModule({
  declarations: [TextNumberComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    GeneralModule,
    InputMaskModule
  ],
  exports: [TextNumberComponent]
})
export class TextNumberDialogModule {
}
