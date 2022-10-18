import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Person } from '../model/person.model';
import { EdiResponse } from '../model/edi-respose.model'
import { Observable, of } from 'rxjs';
import { PersonSecurityDetail } from '../model/personSecurityDetail.model';
import { Application } from '../model/application.model';
import { DateTime } from 'luxon';

@Injectable()
export class MockApiService extends ApiService {

  failFlag = false; // Intended to be used as a flag to send error when needed
  secondLevel = false;

  getPersonBySsn(ssn: string): Observable<EdiResponse> {
    let person: Person = new Person();
    person.personId = 1;
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = person;
    if (this.failFlag) {
      resp.result = null;
      return of(resp);
    }
    return of(resp);
  }

  getPersonByRegistrationToken(emailToken: string): Observable<EdiResponse> {
    let aUser = new Person();
    aUser.personId = 1;
    aUser.firstName = 'Ichigo';
    aUser.middleName = '';
    aUser.lastName = 'Kurosaki';
    aUser.dateOfBirth = DateTime.local(2012, 12, 12).toMillis();
    aUser.ssn = '545-234-234';
    aUser.jobTitle = 'Shinigami';
    aUser.phoneNumber = '6412344567';
    aUser.extension = '1234';
    aUser.faxNumber = '';
    aUser.emailAddress = 'ichiku@test.com';
    aUser.streetLine1 = '';
    aUser.streetLine2 = '';
    aUser.city = 'Karakura';
    aUser.state = '';
    aUser.zipCode = '12345';
    aUser.role = 0;

    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = aUser;
    return of(resp);
  }

  getInitialRegInfo(personId: string, role: string): Observable<any> {
    return of({ data: 'data' });
  }

  validatePerson(emailAddress: string, birthDate: string, ssn: string): Observable<EdiResponse> {
    let aUser = new Person();
    aUser.personId = 1;
    aUser.firstName = 'Ichigo';
    aUser.middleName = '';
    aUser.lastName = 'Kurosaki';
    aUser.dateOfBirth = DateTime.local(2012, 12, 12).toMillis();
    aUser.ssn = '545-234-234';
    aUser.jobTitle = 'Shinigami';
    aUser.phoneNumber = '6412344567';
    aUser.extension = '1234';
    aUser.faxNumber = '';
    aUser.emailAddress = 'ichiku@test.com';
    aUser.streetLine1 = '';
    aUser.streetLine2 = '';
    aUser.city = 'Karakura';
    aUser.state = '';
    aUser.zipCode = '12345';
    aUser.role = 0;
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = aUser;
    return of(resp);
  }

  validatePersonForgot(emailAddress: string, birthDate: string, ssn: string, flow: string): Observable<EdiResponse> {
    let aUser = new Person();
    aUser.personId = 1;
    aUser.firstName = 'Ichigo';
    aUser.middleName = '';
    aUser.lastName = 'Kurosaki';
    aUser.dateOfBirth = DateTime.local(2012, 12, 12).toMillis();
    aUser.ssn = '545-234-234';
    aUser.jobTitle = 'Shinigami';
    aUser.phoneNumber = '6412344567';
    aUser.extension = '1234';
    aUser.faxNumber = '';
    aUser.emailAddress = 'ichiku@test.com';
    aUser.streetLine1 = '';
    aUser.streetLine2 = '';
    aUser.city = 'Karakura';
    aUser.state = '';
    aUser.zipCode = '12345';
    aUser.role = 0;
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = aUser;
    if (this.failFlag) {
      resp.errors = [{ 'message': 'error' }];
      resp.result = null;
    }
    return of(resp);
  }

  validateSsnUsername(ssn: string, username: string): Observable<EdiResponse> {
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = 'success';
    return of(resp);
  }

  checkAuthRepresentative(email: string): Observable<EdiResponse> {
    let resp = new EdiResponse();
    resp.status = 200;
    if (this.failFlag) {
      resp.result = { person: new Person(), message: 'EMAIL_FOUND_INVALID' };
    } else {
      resp.result = { person: new Person(), message: 'EMAIL_FOUND' };
    }
    return of(resp);
  }

  doLogin(loginData: any): Observable<EdiResponse> {
    let resp = new EdiResponse();
    resp.status = 200;
    if (this.failFlag) {
      resp.errors = [{ 'message': 'INACTIVE' }];
      resp.result = null;
    } else {
      resp.result = { personId: 1, token: 123, refreshToken: 1234 };
    }
    return of(resp);
  }

  validateCredentials(loginData: any): Observable<EdiResponse> {
    let resp = new EdiResponse();
    resp.status = 200;
    if (this.failFlag) {
      resp.errors = [{ 'message': 'Message' }];
      resp.result = 'reviewemail';
    } else {
      resp.result = { personId: 1, token: 123, refreshToken: 1234 };
    }
    return of(resp);
  }

  sendEmailNotification(person: Person): Observable<EdiResponse> {
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = true;
    return of(resp);
  }

  resetPassword(person: Person) {
    let resp = new EdiResponse();
    resp.status = 200;
    if (this.failFlag) {
      resp.errors = [{ 'message': 'Message' }];
      resp.result = { securityAnswerCount: 3 };
    } else {
      resp.result = { personId: 1 };
    }
    return of(resp);
  }

  doLogout(logoutData: any): Observable<EdiResponse> {
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = true;
    return of(resp);
  }

  getValidationStatusCodes(): Observable<EdiResponse> {
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = [];
    return of(resp);
  }

  updatePassword(newPassword: string, currentPassword: string) {
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = [];
    return of(resp);
  }

  updatePasswordOos(newPassword: string, currentPassword: string) {
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = [];
    return of(resp);
  }

  validateChangePasswordTS() {
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = [];
    return of(resp);
  }

  validateChangePasswordTSOos(){
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = [];
    return of(resp);
  }

}
