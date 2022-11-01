import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

export const BULLETIN_BOARD_SAVE = '/api/testurl'

@Injectable()
export class BulletinBoardService {

  webServiceEndpoint = '';

  constructor(private httpClient: HttpClient) {}

  submitBulletinBoardMessages(applications: string[], message: string) {
    const data = {applications, message}
    return of(data)
    // return this.httpClient.post(BULLETIN_BOARD_SAVE, data)
  }

}
