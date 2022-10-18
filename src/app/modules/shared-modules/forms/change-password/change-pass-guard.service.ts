import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';

@Injectable()
export class ChangePassGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.validatedForResetPassword) {
      return false;
    }
    return true;
  }

}
