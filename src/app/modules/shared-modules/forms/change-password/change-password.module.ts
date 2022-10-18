import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GeneralModule} from '../../general/general.module';
import {RouterModule, Routes} from '@angular/router';
import {DialogModule} from 'primeng-lts/dialog';
import {ChangePassGuard} from './change-pass-guard.service';

const changePasswordRoutes: Routes = [
  {
    path: '', children: [
      {path: '', component: ChangePasswordComponent, canActivate: [ChangePassGuard]},
    ]
  }];

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GeneralModule,
    DialogModule,
    RouterModule.forChild(changePasswordRoutes)
  ], providers: [ChangePassGuard]
})
export class ChangePasswordModule {
}
