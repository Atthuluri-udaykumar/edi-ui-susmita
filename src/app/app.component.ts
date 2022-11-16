import { Component, HostListener, Inject } from '@angular/core';
import { TimeoutService } from './services/timeout.service';
import { LoadingSpinnerService } from './modules/shared-modules/general/loading/loading-spinner.service';
import { AuthService } from './services/auth.service';
import { ErrorMessagesService } from './modules/shared-modules/general/error-messages/error-messages.service';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
import { SessionService } from './services/session.service';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng-lts/api';
import { RouterService } from './services/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // loading: boolean = false;
  error500 = false;
  showIdleWarning = false;
  sessionRoute = false;
  authenticated: Boolean = false;
  menuItems: MenuItem[] = [
    { label: 'Account Management' },
    { label: 'Change Password', 
      command: (click)=> {this.navigateTo('resetPassword', true)}
    },
    { 
      label: 'ECRS',
      items: [
        {label: 'ECRS 1'},
        {label: 'ECRS 2'}
      ]
    },
    { label: 'Bulletin Board', routerLink: 'bulletinBoard' },
    {
      label: " Review Submitters Requiring Manual Vetting", routerLink: "submittersRequiring"
    },
  ];

  constructor(private authService: AuthService, private session: SessionService, private timeoutService: TimeoutService,
    private loadingSpinner: LoadingSpinnerService, private errorService: ErrorMessagesService,
    private apiService: ApiService,
    private routerService: RouterService,
    private router: Router, @Inject(DOCUMENT) private document: any) {

    this.timeoutService.setTimeoutSeconds(60 * 14); // call this method if you want to override default 20 minute timeout to 5 mins
       this.authService.authenticated.subscribe(auth => {
        this.authenticated = auth;
       });
    // loadingSpinner
    //   .onLoadingChanged
    //   .subscribe(isLoading => this.loading = isLoading);

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const sessionRoutes = ['/', '/login', '/sessionExpired', '/sessionException', '/version'];
      let isSessionRoute: boolean = true;
      for (let value of sessionRoutes) {
        if (event['url'].toLowerCase() === value.toLowerCase()) {
          isSessionRoute = false;
          break;
        }
      }
      if (event['url'] && isSessionRoute) {
        this.sessionRoute = true;
        this.timeoutService.startResetTimer();
      } else {
        this.timeoutService.stopTimer();
        this.sessionRoute = false;
      }
    });

    this.timeoutService.idleWarning.subscribe(n => {
      console.log('Idle warning Triggered next.. ' + n.toString());
      this.showIdleWarning = true;
      this.timeoutService.startIdleCountDown();
    });

    this.timeoutService._timeoutExpiredLogOut.subscribe(v => {
      this.logOut().then(() => {
        this.router.navigate(['sessionExpired']); // Navigate after logOut finishes
      });
    });

    errorService.http500.subscribe(value => {
      this.error500 = value;
    });

  }

  @HostListener('mousemove')  // this two events should be enough to determine user inactivity
  @HostListener('keypress') resetIdleTime() {
    if (!this.showIdleWarning && this.sessionRoute) {
      this.timeoutService.startResetTimer();
    }
  }

  stayLoggedIn() {
    this.timeoutService.startResetTimer();
    this.showIdleWarning = false;
    this.refreshToken(); // get a new token
  }

  logOutPressed() {
    this.logOut();
    this.document.location.href = environment.url;
  }

  private async logOut() {
    console.log('APP LOGOUT TRIGGERED');
    // do session.logout always before authService.logout
    await this.session.logout(this.authService.validated).finally(() => {
      this.authService.logout();
      this.timeoutService.stopTimer();
      this.showIdleWarning = false;
    });
  }

  onActivate(event: Event) {
    window.scrollTo(0, 0); // This will reset the scroll for every page to the top
  }

  @HostListener('window:beforeunload', ['$event'])
  async beforeUnloadHandler(event) {
    console.log('App unloading');
    await this.session.logout(this.authService.validated);
    this.authService.logout();
  }

  refreshToken(): Observable<string> {
    this.authService.token_expired = true;
    return this.apiService.doRefreshToken().pipe(map(data => {
      this.authService.setToken(data.result.toString());
      this.authService.token_expired = false;
      return data.result.toString();
    },
      catchError(e => {
        console.log(e);
        return '';
      })));
  }

  navigateTo(route, state: boolean = null) {
    this.routerService.navigateTo(route, state)
  }

}
