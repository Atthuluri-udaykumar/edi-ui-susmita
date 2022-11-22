import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
@Component({
  selector: 'app-unlock-pin',
  templateUrl: './unlock-pin.component.html',
  styleUrls: ['./unlock-pin.component.css']
})
export class UnlockPinComponent implements OnInit {

  constructor(
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.routerService.navigateTo('accountInfo', false);
  }

  onSelectChage() {
    this.routerService.navigateTo('accountInfo', false);
  }


}
