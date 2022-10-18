import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoFormPlanSponsorComponent} from './info-form-plan-sponsor/info-form-plan-sponsor.component';
import {InputMaskModule} from 'primeng-lts/inputmask';
import {GeneralModule} from '../../general/general.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [InfoFormPlanSponsorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    GeneralModule
  ],
  exports: [
    InfoFormPlanSponsorComponent
  ]
})
export class InfoPlanSponsorFormModule {
}
