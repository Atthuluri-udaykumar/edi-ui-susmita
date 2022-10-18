import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Inject, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, filter, finalize, map, switchMap, take, tap} from 'rxjs/operators';
import {ApiService} from '../api.service';
import {ErrorMessagesService} from '../../modules/shared-modules/general/error-messages/error-messages.service';
import systemErrors from '../system-errors';
import {ResponseService} from '../response.service';
import {DOCUMENT} from '@angular/common';
import {SessionService} from '../session.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  loginOutFlag: boolean = false;

  constructor(private auth: AuthService, private session: SessionService, private router: Router,
              private injector: Injector, private errorService: ErrorMessagesService,
              private responseService: ResponseService, @Inject(DOCUMENT) private document: any) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({body: this.handleBody(event.body)});
        }
        return event;
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
            return this.handle401Error(request, next, err);
          } else if (err.status === 403) {
            return this.handle403Error(request, next, err);
          } else {
            this.errorService.clear();
            if (err.status === 0) {
              this.errorService.add({detail: systemErrors['error.connection']});
            } else {
              if (!this.isPrimitive(err.error)) {
                this.errorService.addAll(this.responseService.handleError(err)); // TODO check
              } else {
                // This should never happen
                this.errorService.http500.next(true);
                this.router.navigate(['serverError']);
              }
            }

            return observableThrowError(err);
          }
        }
      })
    );
  }

  private handleBody(body: any) {
    if (body.status !== 200) {
      this.errorService.clear();
    }
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler, error) {
    if (error && (error.url.indexOf('/refreshToken') < 0) && (error.error && typeof error.error === 'string' &&
      error.error.indexOf('expired') >= 0)) {
      if (error.url.indexOf('/close') >= 0) {
        this.auth.logout(); // Trying to close session failed because JWT Token is no longer valid
        this.router.navigate(['/sessionExpired']);
        return observableThrowError(error.error);
      } else {
        this.auth.token_expired = true;
        if (!this.isRefreshingToken) {
          this.isRefreshingToken = true;
          //
          // Reset here so that the following requests wait until the token
          // comes back from the refreshToken call.
          this.tokenSubject.next(null);
          //
          return this.refreshToken().pipe(switchMap((newToken: string) => {
              if (newToken) {
                this.tokenSubject.next(newToken);
                return next.handle(this.addToken(req, newToken));
              }
              // If we don't get a new token, we are in trouble so logout.
              return this.logoutUser('401: Expired Credentials');
            }),
            catchError(e => {
              // If there is an exception calling 'refreshToken', bad news so logout.
              return this.logoutUser('401: Could not refresh credentials');
            }),
            finalize(() => {
              this.isRefreshingToken = false;
            }));
        } else {
          return this.tokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(token => {
              return next.handle(this.addToken(req, token));
            }));
        }
      }
    } else {
      if (error.url.indexOf('/login') >= 0) {
        this.errorService.add({detail: systemErrors['error.generic.unauthorized']}); // Generic should not happen
      }
      if (error.url.indexOf('/refreshToken') >= 0) {
        this.logoutUser('401: Refresh token invalid need to authenticate again');
      }
    }

    return this.logoutUser('401: Unexpected Error: ' + JSON.stringify(error));
  }

  logoutUser(message: string) {
    // Route to the login page (implementation up to you)
    const fullName = this.session.getCurrentUser().userName;
    if (!this.loginOutFlag) {
      this.loginOutFlag = true;
      this.session.logout(this.auth.validated).finally(
        () => {
          this.auth.logout();
          this.loginOutFlag = false;
          this.session.userName = fullName;
          this.session.exceptionMessage = message;
          this.router.navigate(['/sessionException']);
        }
      );
    } else {
      console.log('WARNING: Forced Session Termination');
    }
    return observableThrowError(message);
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (this.auth.getToken() && !this.auth.isTokenExpired()) {
      return req.clone({setHeaders: {Authorization: 'Bearer ' + token}});
    } else {
      return req;
    }
  }

  refreshToken(): Observable<string> {
    const apiService = this.injector.get(ApiService);
    return apiService.doRefreshToken().pipe(map(data => {
        this.auth.setToken(data.result.toString());
        this.auth.token_expired = false;
        return data.result.toString();
      },
      catchError(e => {
        console.log(e);
        return '';
      })));
  }

  handle403Error(req: HttpRequest<any>, next: HttpHandler, error) {
    let message = systemErrors['error.generic.forbidden.operation'];
    this.errorService.clear();
    this.errorService.add({detail: message}); // Generic message
    return observableThrowError(message);
  }

  isPrimitive(value: any) {
    return (typeof value !== 'object' && typeof value !== 'function') || value === null;
  }

}
