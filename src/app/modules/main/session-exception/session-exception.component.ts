import {Component, Inject, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {DOCUMENT} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'app-session-exception',
  templateUrl: './session-exception.component.html',
  styleUrls: ['./session-exception.component.css']
})
export class SessionExceptionComponent implements OnInit {

  exceptionMessage = '';
  environmentUrl = environment.url;
  fullName: string = '';
  sessionTime: Date = new Date();
  sessionTimeoutFlag;

  constructor(@Inject(DOCUMENT) private document: any, private titleService: Title, private session: SessionService ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Session Exception | EDI');
    this.exceptionMessage = this.session.exceptionMessage;
    this.sessionTimeoutFlag = (this.exceptionMessage && this.exceptionMessage.indexOf("HTTP Status 401 - The token invalid - does not match current session in cache") !== -1)
    this.fullName = this.session.userName;
  }

  goToLogin() {
    this.document.location.href = environment.url + '/sws';
  }

  goToPWS() {
    this.document.location.href = environment.url;
  }
}
