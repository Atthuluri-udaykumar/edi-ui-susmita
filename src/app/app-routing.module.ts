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

  // Lazy Loaded routes
  { path: 'version', component: VersionComponent },
  { path: 'sessionException', component: SessionExceptionComponent },
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