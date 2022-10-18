import {Component, Inject, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {DOCUMENT} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.css']
})
export class SessionExpiredComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Session Expired | EDI');
  }

  goToLogin() {
    this.document.location.href = environment.url + '/sws';
  }

  goToPWS() {
    this.document.location.href = environment.url;
  }

}
