import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserTableComponent } from './user-table/user-table.component';
import { ReactivateSuccessComponent } from './reactivate-success/reactivate-success.component';
import { UnlockUserAccountComponent } from './unlock-user-account/unlock-user-account.component';
import { ConfirmReactivateComponent } from './confirm-reactivate/confirm-reactivate.component';
import { ResendTokenComponent } from './resend-token/resend-token.component';
import { ResendThankyouComponent } from './resend-thankyou/resend-thankyou.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserTableComponent,
    ReactivateSuccessComponent,
    UnlockUserAccountComponent,
    ConfirmReactivateComponent,
    ResendTokenComponent,
    ResendThankyouComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
