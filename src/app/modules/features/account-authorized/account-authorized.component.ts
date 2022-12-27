import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
@Component({
  selector: 'app-account-authorized',
  templateUrl: './account-authorized.component.html',
  styleUrls: ['./account-authorized.component.css']
})
export class AccountAuthorizedComponent implements OnInit {


  constructor(
    private routerService: RouterService
  ) { }
  city:any;

  ngOnInit(): void {
  }

  onCancel() {
    this.routerService.navigateTo('dashboard', false);
  }

  onContinue(){
    this.routerService.navigateTo('accountInfo', false);
  }

  onUpdate(){
    this.routerService.navigateTo('accountAuthorizedInfo', false);
  }
}
