import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-account-authorized-preview',
  templateUrl: './account-authorized-preview.component.html',
  styleUrls: ['./account-authorized-preview.component.css']
})
export class AccountAuthorizedPreviewComponent implements OnInit {

  constructor(
    private routerService: RouterService
  ) { }
  authorizedRep: any = {}
  currentRreList:any=[]
  ngOnInit(): void {

    this.authorizedRep = {
      rreId: 7890,
      firstName: 'Obi-Wan',
      lastName: 'Knobi',
      jobTitle: 'MR AR Found',
      phone: '5126789045',
      extn: '7767',
      fax: '7126543210',
      email: 'test@gami.com',
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
  
  onContinue(){
    this.routerService.navigateTo('accountAuthorized', false);
  }


}
