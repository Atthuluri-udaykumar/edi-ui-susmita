import {Injectable} from '@angular/core';
import {SessionStorageService} from '../utils/web-storage/service/web-storage.service';
import {Person} from '../model/person.model';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {Application} from '../model/application.model';

@Injectable()
export class SessionService {

  current_user: BehaviorSubject<Person> = new BehaviorSubject<Person>(undefined);
  validation_attempts: number = 0;

  current_application: Application = new Application();

  exceptionMessage = '';
  userName = '';

  constructor(private storageService: SessionStorageService, private apiService: ApiService) {
    this.current_user.next(storageService.get('current_user'));
  }

  setCurrentUser(user: Person) {
    // this.storageService.set('current_user', user);
    this.current_user.next(user);
  }

  getCurrentUser(): Person {
    // this.current_user.next(this.storageService.get('current_user'));
    return this.current_user.getValue();
  }

  increaseValidationAttempt() {
    this.validation_attempts++;
  }

  decode(key, pid) {
    let value = atob(key);
    return value.replace(pid, '');
  }

  async logout(outOfSessionPage: boolean) {
    console.log('SESSION LOGOUT TRIGGERED');
    if (!outOfSessionPage) { // It is not an oos page (login, mfa, registration flows)
      if (this.current_user.value) {
        await this.apiService.doLogout({
          username: this.current_user.value.userName,
          password: 'logout',
          personId: this.current_user.value.personId
        }).toPromise().catch(err => {
          console.log(JSON.stringify(err));
        });
      }
    }
    this.current_user.next(undefined);
  }

}
