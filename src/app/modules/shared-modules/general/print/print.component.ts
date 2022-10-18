import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PrintService} from './print.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {


  @Output() pressPrint = new EventEmitter<boolean>();

  @Output() endPrint = new EventEmitter<boolean>();

  pressed = false;

  constructor(private printService: PrintService) {
  }

  ngOnInit() {
    this.printService.printFinished.subscribe(event => {
      if (this.pressed) {
        this.endPrint.emit(true);
        this.pressed = false;
      }
    });
  }

  print() {
    this.pressed = true;
    this.pressPrint.emit(true);
    setTimeout(function () {
      window.print();
    }, 500);
  }

}
