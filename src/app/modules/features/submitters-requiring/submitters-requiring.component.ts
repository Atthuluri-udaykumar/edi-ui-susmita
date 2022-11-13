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

  ngOnInit(): void {
  }

  onCancel(){
    this.routerService.navigateTo('dashboard', false);
  }


}
