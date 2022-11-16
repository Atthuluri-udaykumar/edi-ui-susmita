import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserTableComponent } from './user-table/user-table.component';
import { DashboardModelComponent } from './dashboard-model/dashboard-model.component';
import {DialogModule} from 'primeng-lts/dialog';
import { UserInformationComponent } from './user-information/user-information.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserTableComponent,
    DashboardModelComponent,
    UserInformationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DialogModule
  ]
})
export class DashboardModule { }
