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

  public selectedOption:String;
  ngOnInit(): void {
  }

  onCancel(){
    this.routerService.navigateTo('submittersRequiring', false);
  }

  onSelectChange(event:any){
  
  }

  onGo(){
    if(this.selectedOption === 'Unlock PIN'){
      this.routerService.navigateTo('unlockPin', false);
    }
  }

}
