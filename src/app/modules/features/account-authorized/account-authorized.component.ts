import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-account-authorized',
  templateUrl: './account-authorized.component.html',
  styleUrls: ['./account-authorized.component.css']
})
export class AccountAuthorizedComponent implements OnInit {
  rreId: String;

  constructor(
    private routerService: RouterService,
    private router: Router
  ) { }
  city: any;
  authorizedData: any={
    rreId:'',
    emailId:''
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.routerService.navigateTo('dashboard', false);
  }

  onContinue() {
    this.routerService.navigateTo('accountInfo', false);
  }


  onUpdate() {
    this.router.navigate(["accountAuthorizedInfo", JSON.stringify(this.authorizedData)]);
  }
  onReplace() {
    this.router.navigate(["replaceAuthorizedRep", this.rreId || "0"]);
  }

}
