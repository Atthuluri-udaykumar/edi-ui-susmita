import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.css']
})
export class UserAgreementComponent implements OnInit {

  // @ViewChild('scrollDiv') div: ElementRef;

  // @Output() read: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {

  }

  onScroll() {
    // if ((this.div.nativeElement.scrollTop + this.div.nativeElement.clientHeight) >= (this.div.nativeElement.scrollHeight - 20)) {
    //   this.read.emit(true);
    // }
  }


}
