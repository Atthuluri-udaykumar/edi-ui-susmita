import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-vet-submitter',
  templateUrl: './vet-submitter.component.html',
  styleUrls: ['./vet-submitter.component.css']
})
export class VetSubmitterComponent implements OnInit {

  constructor(
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
  }
  onCancel() {
    this.display=false
    this.routerService.navigateTo('accountInfo', false);
  }

  display=false;
  onVetted() {
    this.display=true
  }

  onHideModel(){
    this.display=false
    this.routerService.navigateTo('accountInfo', false);
  }

}
