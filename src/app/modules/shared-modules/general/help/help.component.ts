import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {HelpService} from './help.service';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {


  @Output() pressHelp = new EventEmitter<boolean>();

  constructor(private helpService: HelpService, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
  }

  navigate() {
    this.pressHelp.emit(true);
    window.open(environment.url + this.helpService.getHelpIconUrl(), '_blank');
  }

}
