import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Person } from '../model/person.model';
import { EdiResponse } from '../model/edi-respose.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomURLEncoder } from '../utils/CustomURLEncoder';

@Injectable()
export class ApiService {

  webServiceEndpoint = '';

  constructor(private httpClient: HttpClient, private encoder: CustomURLEncoder) {
    this.webServiceEndpoint = environment.webServiceEndpoint;
  }

  // doLogin(loginData: any): Observable<EdiResponse> { // receives Person object
  //   let headers = new HttpHeaders({
  //     'Authorization': 'Basic ' + btoa(loginData.username + ':' + loginData.password)
  //   });
  //   headers = headers.append('X-Requested-With', 'XMLHttpRequest'); // To prevent Spring Security to send WWW-Authentication header

  //   return this.httpClient.post<EdiResponse>(this.webServiceEndpoint + '/login', loginData, { headers: headers });
  // }

  //This is mock code for testing UI without login
  doLogin(loginData: any): Observable<EdiResponse> {
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = { personId: 1, token: 123, refreshToken: 1234 };

    return of(resp);
  }

  doRefreshToken(): Observable<EdiResponse> {
    return this.httpClient.get<EdiResponse>(this.webServiceEndpoint + '/refreshToken');
  }

  getInitialRegInfo(personId: string, role: string) { // receives a map of values
    let params = new HttpParams();

    params = params.append('personId', personId);
    params = params.append('role', role);
    return this.httpClient.get<any>(this.webServiceEndpoint + '/invited/initialRegistrationData', { params: params });
  }

  validatePerson(emailAddress: string, birthDate: string, ssn: string): Observable<EdiResponse> { // returns person object with mfa
    let person = {
      emailAddress: emailAddress,
      dateOfBirth: birthDate.toString(),
      ssn: ssn
    };
    return this.httpClient.post<any>(this.webServiceEndpoint + '/person/valid', person);
  }

  validatePersonForgot(emailAddress: string, birthDate: string, ssn: string, workflowId: string): Observable<EdiResponse> {
    // returns person object
    let person = {
      emailAddress: emailAddress,
      dateOfBirth: birthDate.toString(),
      ssn: ssn
    };
    let params = new HttpParams();
    params = params.append('workflowId', workflowId);

    return this.httpClient.post<any>(this.webServiceEndpoint + '/person/validate/personInformation', person, { params: params });
  }

  resetPassword(person: Person) {
    let body = {
      loginId: person.userName,
      password: person.password,
      personalSecurityId: person.personalSecurityId
    };
    return this.httpClient.post<EdiResponse>(this.webServiceEndpoint + `/person/password-reset`, body);
  }

  /* Person Service */

  doLogout(logoutData: any): Observable<EdiResponse> {
    return this.httpClient.post<EdiResponse>(this.webServiceEndpoint + '/close', logoutData);
  }

  getSession(personId: string): Observable<EdiResponse> {
    //This is temp code
    let resp = new EdiResponse();
    resp.status = 200;
    resp.result = { personId: 1, token: 123, refreshToken: 1234 };
    return of (resp);
    //This code below is how it should work when the API service is available
    //return this.httpClient.get<EdiResponse>(this.webServiceEndpoint + '/person/' + personId + '/session');
  }

}
