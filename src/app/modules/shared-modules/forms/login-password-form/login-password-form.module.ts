import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPasswordComponent} from './login-password/login-password.component';
import {LoginPasswordService} from './login-password.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GeneralModule} from '../../general/general.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModule
  ],
  declarations: [LoginPasswordComponent],
  providers: [LoginPasswordService],
  exports: [
    LoginPasswordComponent
  ]
})
export class LoginPasswordFormModule {
}
