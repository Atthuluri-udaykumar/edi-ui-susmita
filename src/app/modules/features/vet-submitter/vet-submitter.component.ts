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
  isVetted: Boolean = true;
  ngOnInit(): void {
  }

  onCancel() {
    this.isVetted=false
    this.routerService.navigateTo('accountInfo', false);
  }

 
  onVetted() {
    this.isVetted=false
  }

}
