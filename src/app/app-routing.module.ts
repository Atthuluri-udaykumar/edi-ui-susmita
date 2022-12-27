import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guards/auth-guard.service';
import { LoginComponent } from './modules/main/login/login.component';
import { NotFoundComponent } from './modules/main/not-found/not-found.component';
import { ValidGuard } from './services/guards/valid-guard.service';
import { LoginWarningComponent } from './modules/main/login-warning/login-warning.component';
import { ServerErrorComponent } from './modules/main/server-error/server-error.component';
import { SessionExpiredComponent } from './modules/main/session-expired/session-expired.component';
import { VersionComponent } from './modules/main/version/version.component';
import { SessionExceptionComponent } from './modules/main/session-exception/session-exception.component';
import { ResetPasswordComponent } from './modules/features/reset-password/reset-password.component';
import { SubmittersRequiringComponent } from './modules/features/submitters-requiring/submitters-requiring.component';
import { AccountInfoComponent } from './modules/features/account-info/account-info.component';
import { UnlockPinComponent } from './modules/features/unlock-pin/unlock-pin.component';
import { EcrsUserLookupComponent } from './modules/features/ecrs-user-lookup/ecrs-user-lookup.component';
import { VetSubmitterComponent } from './modules/features/vet-submitter/vet-submitter.component';
import { AccountManagementComponent } from './modules/features/account-management/account-management.component';
import { AccountAuthorizedComponent } from './modules/features/account-authorized/account-authorized.component';
import { AccountAuthorizedInfoComponent } from './modules/features/account-authorized-info/account-authorized-info.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/warning', component: LoginWarningComponent },

  {
    path: 'user-profile',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard]
  },
  { 
    path: 'bulletinBoard', 
    loadChildren: () => import ('./modules/features/bulletin-board/bulletin-board.module').then(m => m.BulletinBoardModule), 
    canLoad: [AuthGuard] 
  },
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'ecrsUserLookup', component: EcrsUserLookupComponent, canActivate: [AuthGuard] },
  { path: 'version', component: VersionComponent },
  { path: 'sessionException', component: SessionExceptionComponent },
  { path: 'submittersRequiring', component: SubmittersRequiringComponent, canActivate: [AuthGuard] },
  { path: 'accountInfo', component: AccountInfoComponent, canActivate: [AuthGuard] },
  { path: 'unlockPin', component: UnlockPinComponent, canActivate: [AuthGuard] },
  { path: 'vetSubmitter', component: VetSubmitterComponent, canActivate: [AuthGuard] },
  { path: 'accountManagement', component: AccountManagementComponent, canActivate: [AuthGuard] },
  { path: 'accountAuthorized', component: AccountAuthorizedComponent, canActivate: [AuthGuard] },
  { path: 'accountAuthorizedInfo', component: AccountAuthorizedInfoComponent, canActivate: [AuthGuard] },
  { path: 'sessionExpired', component: SessionExpiredComponent },
  { path: 'serverError', component: ServerErrorComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: '**', redirectTo: 'notFound' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true, relativeLinkResolution: 'legacy' }) // Enable tracing is a debug feature
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
