import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import {AuthService} from '../auth.service';
import {LoadingSpinnerService} from '../../modules/shared-modules/general/loading/loading-spinner.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private loadingSpinner: LoadingSpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // emit onStarted event before request execution
    this.loadingSpinner.onStarted(request);

    if (this.auth.token && !this.auth.token_expired) {
      console.log('-- Intercepting token added');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        }
      });
    } else if (this.auth.refreshToken) {
      console.log('-- Intercepting refresh token added');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.refreshToken}`
        }
      });
    }

    return next.handle(request).pipe(
      // emit onFinished event after request execution
      finalize(() => this.loadingSpinner.onFinished(request)));
  }
}
