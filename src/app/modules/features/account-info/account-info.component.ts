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

  public selectedOption: String;
  submittersData: any[] = []
  ngOnInit(): void {
    this.submittersData = [
      {
        firstName: 'Jack',
        MI: "P",
        lastName: "Test",
        email: 'jack@gmail.com',
        phone: '865895498',
        ext: '6487'
      },
      {
        firstName: 'Sarah',
        MI: "K",
        lastName: "Lopez",
        email: 'sarah769@gmail.com',
        phone: '9742894545',
        ext: '6487'
      },
    ]
  }

  onCancel() {
    this.routerService.navigateTo('submittersRequiring', false);
  }


  onGo() {
      this.routerService.navigateTo('unlockPin', false);
  }

}
