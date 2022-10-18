import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanLoad, Route
} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';

/**
 * Guard that forbids any user to navigate to any oos route without being validated
 */
@Injectable()
export class ValidGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router, @Inject(DOCUMENT) private document: any) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.validated) {
      return true;
    } else {
      this.authService.logout();
      this.document.location.href = environment.url + '/sws';
      return false;
    }
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean { // Applied to Modules
    if (this.authService.validated) {
      return true;
    } else {
      this.authService.logout();
      this.document.location.href = environment.url + '/sws';
      return false;
    }
  }

}
