import { Injectable } from '@angular/core';
import { SessionStorageService } from '../utils/web-storage/service/web-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  token: string = '';
  refreshToken: string = '';
  authenticated: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  token_expired: boolean;

  // Out of Session Page (login, registration, mfa) Variables
  validated = false; // used for validate person information pages
  validatedForResetPassword = false; // used for reset Password page
  validatedEmail = false; // used in VerifyEmail page
  validatedEmailToken = ''; // used for any token
  validationFlow = '';

  constructor(private storageService: SessionStorageService) {
  }

  setToken(token: string) {
    this.token = token;
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
  }

  logout() {
    this.token = null;
    this.refreshToken = null;
    this.setAuthenticated(false);
    this.cleanValidatePersonVars();
    this.token_expired = false;
    this.storageService.clear();
  }

  setAuthenticated(value: boolean) {
    this.authenticated.next(value);
  }

  getToken() {
    return this.token;
  }

  isTokenExpired() {
    return this.token_expired;
  }

  cleanValidatePersonVars() {
    this.validated = false; // used for validate person information pages
    this.validatedForResetPassword = false; // used for reset Password page
    this.validatedEmail = false; // used in VerifyEmail page
    this.validationFlow = '';
  }
}
