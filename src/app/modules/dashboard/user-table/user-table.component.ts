import { Component, OnInit, Input } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  @Input() accounts;

  constructor (
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    
  }

  onAccountInfo() {
    this.routerService.navigateTo("accountInfo", false);
  }
}
