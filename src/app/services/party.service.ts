import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Party, PartySrvcResponse } from '../model/party.interface';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private serviceUrl: String = '';  // URL to web api
  insurerParties: Party[];
  recoveryAgentParties: Party[];
  parties: Party[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** Log a PartyService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`PartyService: ${message}`);
    console.log(`PartyService:  ${message}`);
  }

    /**
   * Handle Http operation that failed. Because each service method returns a different kind of Observable result,
   * handleError() takes a type parameter to return the safe value as the type that the application expects.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /*
  Uses Remote REST service
  --------------------------------------------------------------------------------------------------------
  getParties(params) : Observable<PartySrvcResponse>{
    console.log("PartyService.getParty() PARAMS= " + JSON.stringify(params));
    this.serviceUrl = 'http://localhost:9897/api/dummy';
    return this.http.get<PartySrvcResponse>(`${this.serviceUrl}/parties?start=${params.start}&end=${params.end}`)
                    .pipe(
                      tap(_ => this.log('fetched parties')),
                      catchError(this.handleError<PartySrvcResponse>('getParties', {}))
                    );
  }
  */

  //Uses dummy fixed data
  //--------------------------------------------------------------------------------------------------------
  getParties(params): Observable<PartySrvcResponse>{
    this.insurerParties = [
        { partyId: 1001234,optInDate: "05/01/2015", name: "Very Long Insurer Party Name 1",rreId: 123}
      , { partyId: 123004,optInDate: "05/01/2015", name: "Very Long Insurer Party Name 2",rreId: 2345, tin: 123456789, siteId: 1111111111}
      , { partyId: 2022,optInDate: "03/01/2015",optOutDate: "12/31/2022",name: "Very Long Insurer Party Name 3",rreId: 12345, tin: 234567890, siteId: 0}
      , { partyId: 1034457,optInDate: "06/15/2015",optOutDate: "05/01/2021",name: "Very Long Insurer Party Name 4",rreId: 78965,tin: 982453,siteId: 0}
      , { partyId: 209108766543,optInDate: "04/23/2018", name: "Very Long Insurer Party Name 5", tin: 126755, siteId: 2222222222}
      , { partyId: 200108766543,optInDate: "05/01/2015",optOutDate: "05/01/2021",name: "Very Long Insurer Party Name 6",rreId: 12347677, tin: 345678901, siteId: 1111111111}
      , { partyId: 3004,optInDate: "05/01/2017", name: "Very Long Insurer Party Name 7",rreId: 2345, tin: 123456789, siteId: 2222222222}
      , { partyId: 1022,optInDate: "03/01/2016", name: "Very Long Insurer Party Name 8",rreId: 12345, tin: 234567890, siteId: 0}
    ];
    this.recoveryAgentParties = [
        { partyId: 20098744,optInDate: "05/01/2015", name: "RA Prty 1", rreId: 123, goPaperlessReqBy: "ABC", reqTin:2276599, reqSiteId: 123467}
      , { partyId: 2019876,optInDate: "05/01/2015", name: "RA Prty 2", rreId: 2345, tin: 123456789, siteId: 2222222222, reqPartyId: 1019987, reqRreId: 672345}
      , { partyId: 20098744,optInDate: "03/01/2015", optOutDate: "12/31/2022",name: "RA Prty 3", rreId: 12345, tin: 234567890, siteId: 0, reqRreId: 887001}
      , { partyId: 20098744,optInDate: "06/15/2015", optOutDate: "05/01/2021",name: "RA Prty 4", rreId: 78965,tin: 12998765,siteId: 1111111111, reqPartyId: 155687, reqRreId: 82556}
      , { partyId: 2021,optInDate: "04/23/2018", name: "RA Prty 5", goPaperlessReqBy: "XYZ", reqPartyId: 1019987, reqRreId: 82345, reqTin:1276599, reqSiteId: 223455}
      , { partyId: 1011234,optInDate: "05/01/2015",optOutDate: "08/01/2019",name: "RA Prty 6", rreId: 12347677, tin: 345678901, siteId: 1111111111, reqTin:2276599, reqSiteId: 123467}
    ];

    this.parties = this.insurerParties.concat(this.recoveryAgentParties);

    return of({
      data: this.parties,
      totalRecords: this.parties.length
    });
  }
}

