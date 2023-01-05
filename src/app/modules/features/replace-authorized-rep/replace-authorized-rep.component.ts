import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { take } from 'rxjs/operators';
import { MessageService } from "primeng-lts/api";

import { Address } from 'src/app/model/address.model';
import { Representative } from 'src/app/model/representative.interface';
import { RouterService } from 'src/app/services/router.service';
import { Error } from "../../../model/error.model";
import { ErrorMessagesService } from '../../shared-modules/general/error-messages/error-messages.service';

@Component({
  selector: 'app-replace-authorized-rep',
  templateUrl: './replace-authorized-rep.component.html',
  styleUrls: ['./replace-authorized-rep.component.css']
})
export class ReplaceAuthorizedRepComponent implements OnInit {
  rreId: string = null;

  authorizedRep: Representative = null;
  newAuthorizedRep: Representative = null;

  showInfo: boolean = false;
  showNewAuthorizedRep: boolean = false;
  showReplacement: boolean = false;
  rreRequired: boolean = false;

  currentRreList: Representative[]= [];
  newRreList: Representative[] = [];
  newArEmail: string = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  errorMsgs: Error[];

  constructor(private routerService: RouterService,
              private route: ActivatedRoute,
              private errorService: ErrorMessagesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rreId = params.get('rreid');
    });

    //Call service to fetch RRE Details for currently Authorized Representative
    this.authorizedRep = {
      rreId: 1234,
      firstName: 'First',
      lastName: 'Last',
      jobTitle: 'MR AR',
      phone: '1234567890',
      extn: '123',
      fax: '9876543210',
      email: 'mr_ar_ghp@test-team.cobqa.com',
      address: {
          streetLine1: 'One West Pennsylvania Ave',
          streetLine2: '.',
          streetLine3: '',
          streetLine4: '',
          city: 'Towson',
          state: 'MD',
          zipcode: {
            zip5: '21204',
            zip4: ''
          }
        }
    };

    this.currentRreList = [
      {
        rreCompanyName: "GHP B2BI Mailbox Test 2",
        rreId: 61186,
      },
      {
        rreCompanyName: "GHP B2BI Mailbox Test 3",
        rreId: 61188,
      },
      {
        rreCompanyName: "GHP B2BI Mailbox Test 4",
        rreId: 61190,
      },
      {
        rreCompanyName: "GHP B2BI Mailbox Test 5",
        rreId: 61204,
      },
      {
        rreCompanyName: "GHP B2BI Mailbox Test 6",
        rreId: 61206,
      },
      {
        rreCompanyName: "GHP B2BI Mailbox Test 7",
        rreId: 61208,
      }
    ];
  }

  onCancel() {
    this.routerService.navigateTo('accountAuthorized', false);
  }

  onContinue() {
    this.showInfo = true;
    /*
      Call service to find out if:
      a. [email-id found]:
        take user to AR Info entry page where they will change existing data fetched for the
        authorized representative found for the email provided
        this.showNewAuthorizedRep = false;
      b. [email-id not-found]:
        take user to AR Info entry page where they will enter all required data
        this.showNewAuthorizedRep = true;
    */
    if(this.newArEmail === 'abc@def.com'){ //mimic a non-existing AR email for which user has to enter new data inside info page
      this.showNewAuthorizedRep = true;
    } else { //
      this.showNewAuthorizedRep = false;
      //mimic an existing AR email for which user has can change/update data pulled from db inside info page
      this.newAuthorizedRep = {
        rreId: 7890,
        firstName: 'Obi-Wan',
        lastName: 'Knobi',
        jobTitle: 'MR AR Found',
        phone: '5126789045',
        extn: '7767',
        fax: '7126543210',
        email: this.newArEmail,
        address: {
            streetLine1: '6th Street',
            streetLine2: 'Party 101',
            streetLine3: '',
            streetLine4: '',
            city: 'Austin',
            state: 'TX',
            zipcode: {
              zip5: '78728',
              zip4: '2034'
            }
          }
      };

    }
  }

  openConfirmReplacement(event) {
    this.newAuthorizedRep = event.newAuthorizedRep;
    this.showInfo = false;
    this.showReplacement = true;
    this.showNewAuthorizedRep = false;
  }

  cancelConfirmReplacement(event){
    this.newAuthorizedRep = event.newAuthorizedRep;
    this.showInfo = true;
    this.showReplacement = false;
    this.showNewAuthorizedRep = false;
  }

  cancelShowArInfo(event){
    this.newAuthorizedRep = event.newAuthorizedRep;
    this.showInfo = false;
    this.showReplacement = false;
  }

}
