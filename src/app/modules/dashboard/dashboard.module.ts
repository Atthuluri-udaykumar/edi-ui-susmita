import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserTableComponent } from './user-table/user-table.component';
import { ResendTokenComponent } from './resend-token/resend-token.component';
import { ResendThankyouComponent } from './resend-thankyou/resend-thankyou.component';
import { ConfirmReactivateComponent } from './confirm-reactivate/confirm-reactivate.component';
import { ReactivateSuccessfulComponent } from './reactivate-successful/reactivate-successful.component';
import { DashboardModelComponent } from './dashboard-model/dashboard-model.component';
import {DialogModule} from 'primeng-lts/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
    UserTableComponent,
    ResendTokenComponent,
    ResendThankyouComponent,
    ConfirmReactivateComponent,
    ReactivateSuccessfulComponent,
    DashboardModelComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DialogModule
  ]
})
export class DashboardModule { }
