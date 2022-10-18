import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {GeneralModule} from '../../general/general.module';
import {RouterModule, Routes} from '@angular/router';
import {SecurityQuestionsComponent} from './security-questions/security-questions.component';
import {SuccessDialogModule} from '../../success-dialog/success-dialog.module';

const securityQuestionsRoutes: Routes = [
  {
    path: '', children: [
      {path: '', component: SecurityQuestionsComponent},
    ]
  }];

@NgModule({
  declarations: [SecurityQuestionsComponent],
  imports: [
    CommonModule,
    GeneralModule,
    ReactiveFormsModule,
    SuccessDialogModule,
    RouterModule.forChild(securityQuestionsRoutes)
  ]
})
export class SecurityQuestionsModule { }
