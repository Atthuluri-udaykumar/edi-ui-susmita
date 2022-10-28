import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmReactivateComponent } from './confirm-reactivate/confirm-reactivate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactivateSuccessComponent } from './reactivate-success/reactivate-success.component';
import { ResendThankyouComponent } from './resend-thankyou/resend-thankyou.component';
import { ResendTokenComponent } from './resend-token/resend-token.component';
import { UnlockUserAccountComponent } from './unlock-user-account/unlock-user-account.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: DashboardComponent },
      { path: 'reactive-success', component: ReactivateSuccessComponent },
      { path: 'unlock-user-account', component: UnlockUserAccountComponent },
      { path: 'confirm-reactive', component: ConfirmReactivateComponent },
      { path: 'resend-token', component: ResendTokenComponent },
      { path: 'resend-thankyou', component: ResendThankyouComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
