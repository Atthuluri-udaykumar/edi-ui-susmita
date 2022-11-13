import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  constructor(
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.routerService.navigateTo('dashboard', false);
  }

}
