import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-submitters-requiring',
  templateUrl: './submitters-requiring.component.html',
  styleUrls: ['./submitters-requiring.component.css']
})
export class SubmittersRequiringComponent implements OnInit {

  constructor(
    private routerService: RouterService
  ) { }
  submittersData: any[] = []
  ngOnInit(): void { this.submittersData = [

    { 
     submitterID:'29323' ,
     registrationDate:"",
     accountType:"",
     contactEmail:'test@gmail.com',
     submitterType:''
    },
  ]
  }

  onCancel(){
    this.routerService.navigateTo('dashboard', false);
  }


  onAccountInfo(){
    this.routerService.navigateTo('accountInfo', false);
  }

}
