import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResendThankyouComponent } from './resend-thankyou/resend-thankyou.component';
import { ResendTokenComponent } from './resend-token/resend-token.component';
import { ConfirmReactivateComponent } from './confirm-reactivate/confirm-reactivate.component';
import { ReactivateSuccessfulComponent } from './reactivate-successful/reactivate-successful.component';
const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: DashboardComponent },
      { path: 'resend-token', component: ResendTokenComponent },
      { path: 'resend-thankyou', component: ResendThankyouComponent },
      { path: 'confirm-reactivate', component : ConfirmReactivateComponent},
      { path: 'reactivate-successful' , component : ReactivateSuccessfulComponent},
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
