import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-account-authorized-info',
  templateUrl: './account-authorized-info.component.html',
  styleUrls: ['./account-authorized-info.component.css']
})
export class AccountAuthorizedInfoComponent implements OnInit {

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
  ) { }
  rreList = [];

  cities: City[];
  selectedCity: City;

  authorizedData: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.authorizedData =   JSON.parse(params.get('id'));
    });

    this.rreList = [
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


    this.cities = [
      { name: 'Select', code: '' },
      { name: 'Alabama', code: 'AL' },
      { name: 'Alaska', code: 'AK' },
      { name: 'Arizona', code: 'AZ' },
      { name: 'Arkansas', code: 'AR' },
      { name: 'California', code: 'CA' },
      { name: 'Colorado', code: 'CO' },
      { name: 'Connecticut', code: 'CT' },
      { name: 'Delaware', code: 'DE' },
      { name: 'District Of Columbia', code: 'DC' },
      { name: 'Florida', code: 'FL' },
      { name: 'Georgia', code: 'GA' },
      { name: 'Hawaii', code: 'HI' },
      { name: 'Idaho', code: 'ID' },
      { name: 'Illinois', code: 'IL' },
      { name: 'Indiana', code: 'IN' },
      { name: 'Iowa', code: 'IA' },
      { name: 'Kansas', code: 'KS' },
      { name: 'Kentucky', code: 'KY' },
      { name: 'Louisiana', code: 'LA' },
      { name: 'Maine', code: 'ME' },
      { name: 'Maryland', code: 'MD' },
      { name: 'Massachusetts', code: 'MA' },
      { name: 'Michigan', code: 'MI' },
      { name: 'Minnesota', code: 'MN' },
      { name: 'Mississippi', code: 'MS' },
      { name: 'Missouri', code: 'MO' },
      { name: 'Montana', code: 'MT' },
      { name: 'Nebraska', code: 'NE' },
      { name: 'Nevada', code: 'NV' },
      { name: 'New Hampshire', code: 'NH' },
      { name: 'New Jersey', code: 'NJ' },
      { name: 'New Mexico', code: 'NM' },
      { name: 'New York', code: 'NY' },
      { name: 'North Carolina', code: 'NC' },
      { name: 'North Dakota', code: 'ND' },
      { name: 'Ohio', code: 'OH' },
      { name: 'Oklahoma', code: 'OK' },
      { name: 'Oregon', code: 'OR' },
      { name: 'Pennsylvania', code: 'PA' },
      { name: 'Rhode Island', code: 'RI' },
      { name: 'South Carolina', code: 'SC' },
      { name: 'South Dakota', code: 'SD' },
      { name: 'Tennessee', code: 'TN' },
      { name: 'Texas', code: 'TX' },
      { name: 'Utah', code: 'UT' },
      { name: 'Vermont', code: 'VT' },
      { name: 'Virginia', code: 'VA' },
      { name: 'Washington', code: 'WA' },
      { name: 'West Virginia', code: 'WV' },
      { name: 'Wisconsin', code: 'WI' },
      { name: 'Wyoming', code: 'WY' },
    ];
  }

  onCancel() {
    this.routerService.navigateTo('accountAuthorized', false);
  }

  onContinue() {
    this.routerService.navigateTo('accountInfoPreview', false);
  }
}

interface City {
  name: string,
  code: string
}

