import {Injectable} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/** A router wrapper, adding extra functions. */
@Injectable()
export class RouterService {

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  passwordIsEDI$: BehaviorSubject<boolean> =  new BehaviorSubject(true);

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
      ;
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

  navigateTo(route, state: boolean = null) {
    if (route === 'resetPassword') {
      this.passwordIsEDI$.next(state);
    } 
    this.router.navigate([route]);
  }
}
