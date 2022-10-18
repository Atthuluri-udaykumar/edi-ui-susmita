import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {AuthService} from './services/auth.service';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './services/guards/auth-guard.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiService} from './services/api.service';
import {AuthInterceptor} from './services/interceptors/auth.interceptor';
import {HttpResponseInterceptor} from './services/interceptors/http-response.interceptor';
import {WebStorageModule} from './utils/web-storage/web-storage.module';
import {SessionService} from './services/session.service';
import {LoginComponent} from './modules/main/login/login.component';
import {RegistrationService} from './services/registration.service';
import {GeneralModule} from './modules/shared-modules/general/general.module';
import {LayoutModule} from './modules/layout/layout.module';
import {Constants} from './services/constants';
import {DateUtilService} from './services/date-util.service';
import {CustomRenderer} from './services/custom-renderer.service';
import {ValidGuard} from './services/guards/valid-guard.service';
import {CanDeactivateGuard} from './services/guards/can-deactivate-guard.service';
import {HttpXssInterceptor} from './services/interceptors/http-xss.interceptor';
import {NotFoundComponent} from './modules/main/not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginWarningComponent} from './modules/main/login-warning/login-warning.component';
import {WelcomeBackComponent} from './modules/main/welcome-back/welcome-back.component';
import {DialogModule} from 'primeng-lts/dialog';
import {SuccessDialogModule} from './modules/shared-modules/success-dialog/success-dialog.module';
import {ServerErrorComponent} from './modules/main/server-error/server-error.component';
import {IdleWarningComponent} from './modules/main/idle-warning/idle-warning.component';
import {SessionExpiredComponent} from './modules/main/session-expired/session-expired.component';
import {CardModule} from 'primeng-lts/card';
import {VersionComponent} from './modules/main/version/version.component';
import {SessionExceptionComponent} from './modules/main/session-exception/session-exception.component';
import {RouterService} from './services/router.service';
import {BaseComponent} from './base.component';
import {SideMenuService} from './services/side-menu.service';
import {TableModule} from 'primeng-lts/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    LoginWarningComponent,
    WelcomeBackComponent,
    ServerErrorComponent,
    IdleWarningComponent,
    SessionExpiredComponent,
    VersionComponent,
    SessionExceptionComponent,
    BaseComponent
  ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        GeneralModule, // print
        LayoutModule, // header, footer, settings, notFound
        WebStorageModule,
        AppRoutingModule,
        DialogModule,
        SuccessDialogModule,
        CardModule,
        FormsModule,
        TableModule
    ],
  providers: [
    Constants,
    DateUtilService,
    AuthService,
    AuthGuard,
    ValidGuard,
    CanDeactivateGuard,
    ApiService,
    RegistrationService,
    RouterService,
    SideMenuService,
    SessionService,
    CustomRenderer, // used to invoke methods on ElementRef programmatically - BlurForwarder Directive
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXssInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private routerExtService: RouterService) {
  }
}
