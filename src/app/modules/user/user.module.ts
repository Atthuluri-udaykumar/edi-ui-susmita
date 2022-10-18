import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserRoutingModule } from './user-routing.module';
import { AccordionModule } from 'primeng-lts/accordion';
import { DialogModule } from 'primeng-lts/dialog';
import { ProgressBarModule } from 'primeng-lts/progressbar';
import { GeneralModule } from '../shared-modules/general/general.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { TableModule } from 'primeng-lts/table';
import { SuccessDialogModule } from '../shared-modules/success-dialog/success-dialog.module';
import { InputMaskModule } from 'primeng-lts/inputmask';
import { LoginPasswordFormModule } from '../shared-modules/forms/login-password-form/login-password-form.module';


@NgModule({
  declarations: [UserProfileComponent, ChangePasswordComponent],
  imports: [

    UserRoutingModule,
    GeneralModule,
    AccordionModule,
    ProgressBarModule,
    DialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SuccessDialogModule,
    TableModule,
    InputNumberModule,
    InputMaskModule,
    GeneralModule,
    LoginPasswordFormModule
  ],
  providers: [DatePipe],
 
})
export class UserModule { }
