import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/guards/auth-guard.service";
import { LoginComponent } from "./modules/main/login/login.component";
import { NotFoundComponent } from "./modules/main/not-found/not-found.component";
import { ValidGuard } from "./services/guards/valid-guard.service";
import { LoginWarningComponent } from "./modules/main/login-warning/login-warning.component";
import { ServerErrorComponent } from "./modules/main/server-error/server-error.component";
import { SessionExpiredComponent } from "./modules/main/session-expired/session-expired.component";
import { VersionComponent } from "./modules/main/version/version.component";
import { SessionExceptionComponent } from "./modules/main/session-exception/session-exception.component";
import { ResetPasswordComponent } from "./modules/features/reset-password/reset-password.component";
import { SubmittersRequiringComponent } from "./modules/features/submitters-requiring/submitters-requiring.component";
import { AccountInfoComponent } from "./modules/features/account-info/account-info.component";
import { UnlockPinComponent } from "./modules/features/unlock-pin/unlock-pin.component";
import { EcrsUserLookupComponent } from "./modules/features/ecrs-user-lookup/ecrs-user-lookup.component";
import { VetSubmitterComponent } from "./modules/features/vet-submitter/vet-submitter.component";
import { EcrsContractorLookupComponent } from "./modules/features/ecrs-contractor-lookup/ecrs-contractor-lookup.component";
import { AccountActivityComponent } from "./modules/features/account-activity/account-activity.component";
import { RegenerateProfileComponent } from "./modules/features/regenerate-profile/regenerate-profile.component";
import { ResetPinComponent } from "./modules/features/reset-pin/reset-pin.component";
import { AccountAuthorizedComponent } from "./modules/features/account-authorized/account-authorized.component";
import { AccountAuthorizedInfoComponent } from './modules/features/account-authorized-info/account-authorized-info.component';
import { AccountManagementComponent } from "./modules/features/account-management/account-management.component";
import { RemoveInvalidSubmitterComponent } from "./modules/features/remove-invalid-submitter/remove-invalid-submitter.component";
import { GrantFullFunctionComponent } from "./modules/features/grant-full-function/grant-full-function.component";
import { PaperlessEmailsComponent } from "./modules/features/paperless-emails/paperless-emails.component";
import { PaperlessPartiesComponent } from "./modules/features/paperless-parties/paperless-parties.component";
import { ReplaceAccountManagerComponent } from "./modules/features/replace-account-manager/replace-account-manager.component";
import { ReplaceAuthorizedRepComponent } from "./modules/features/replace-authorized-rep/replace-authorized-rep.component";
import { AccountAuthorizedPreviewComponent } from "./modules/features/account-authorized-info/account-authorized-preview/account-authorized-preview.component";

const appRoutes: Routes = [
  { path: "", component: LoginWarningComponent },

  {
    path: "user-profile",
    loadChildren: () =>
      import("./modules/user/user.module").then((m) => m.UserModule),
    canLoad: [AuthGuard],
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "bulletinBoard",
    loadChildren: () =>
      import("./modules/features/bulletin-board/bulletin-board.module").then(
        (m) => m.BulletinBoardModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "resetPassword",
    component: ResetPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "accountAuthorized",
    component: AccountAuthorizedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "accountManagement",
    component: AccountManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "regenerateProfile",
    component: RegenerateProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "ecrsUserLookup",
    component: EcrsUserLookupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "ecrsContractorLookup",
    component: EcrsContractorLookupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "replaceAccountManager",
    component: ReplaceAccountManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "submittersRequiring",
    component: SubmittersRequiringComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "accountInfo",
    component: AccountInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "accountInfoPreview",
    component: AccountAuthorizedPreviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "accountActivity/:id",
    component: AccountActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "removeInvalid/:id",
    component: RemoveInvalidSubmitterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "unlockPin",
    component: UnlockPinComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "regenProfile/:id",
    component: RegenerateProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "vetSubmitter",
    component: VetSubmitterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "paperlessEmails/:id",
    component: PaperlessEmailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "resetPin/:id",
    component: ResetPinComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "grantFullFunction/:id",
    component: GrantFullFunctionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "paperlessParties/:id",
    component: PaperlessPartiesComponent,
    canActivate: [AuthGuard],
  },
  {
     path: 'accountAuthorizedInfo/:id',
     component: AccountAuthorizedInfoComponent,
     canActivate: [AuthGuard],
  },
  {
    path: "replaceAuthorizedRep/:rreid",
    component: ReplaceAuthorizedRepComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "login/warning", component: LoginWarningComponent },
  { path: "version", component: VersionComponent },
  { path: "sessionException", component: SessionExceptionComponent },
  { path: "sessionExpired", component: SessionExpiredComponent },
  { path: "serverError", component: ServerErrorComponent },
  { path: "notFound", component: NotFoundComponent },
  { path: "**", redirectTo: "notFound" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true,
      relativeLinkResolution: "legacy",
    }), // Enable tracing is a debug feature
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
