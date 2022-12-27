import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
@Component({
  selector: 'app-account-authorized-info',
  templateUrl: './account-authorized-info.component.html',
  styleUrls: ['./account-authorized-info.component.css']
})
export class AccountAuthorizedInfoComponent implements OnInit {

  constructor(
    private routerService: RouterService
  ) { }
  RRRDetails=[];

  cities: City[];

    selectedCity: City;

  ngOnInit(): void {

    this.RRRDetails=[
      {RRRID:'29993',RRRcompanyName:'Jrd'},
      {RRRID:'29993',RRRcompanyName:'Jrd'}

    ]


    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  onCancel() {
    this.routerService.navigateTo('dashboard', false);
  }

  onContinue(){
    this.routerService.navigateTo('accountInfo', false);
  }
}


interface City {
  name: string,
  code: string
}