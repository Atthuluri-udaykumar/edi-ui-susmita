import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';

import {ErrorMessagesService} from './error-messages.service';
import {WarningMessagesService} from './warning-messages.service';
import {InfoMessagesService} from './info-messages.service';
import {Message} from 'primeng-lts/api';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit, OnChanges {
  @Input() messages: Message[] = [];
  @Input() type: string = 'error';
  @Input() focusOnShow: boolean = true;
  @ViewChild('errorFocus', {read: ElementRef, static: true}) element: ElementRef;

  @Output() actionEvent = new EventEmitter<string>();

  messageClass: string;
  headTitle: string;
  messageLabelClass: string;
  visible: boolean = false;

  constructor(private errorMessagesService: ErrorMessagesService,
              private warningMessagesService: WarningMessagesService,
              private infoMessageService: InfoMessagesService) {
  }

  ngOnInit() {

    switch (this.type) {
      case 'info': {
        this.messageClass = 'usa-alert--info';
        this.headTitle = 'Information Status';
        this.messageLabelClass = 'message-label-info';
        this.infoMessageService.messageSource.subscribe(serviceMsgs => this.messages = serviceMsgs);
        break;
      }
      case 'warning': {
        this.messageClass = 'usa-alert--warning';
        this.headTitle = 'Please review the following warnings:';
        this.messageLabelClass = 'message-label-warning';
        this.warningMessagesService.messageSource.subscribe(serviceMsgs => this.messages = serviceMsgs);
        break;
      }
      case 'error': {
        this.messageClass = 'usa-alert--error';
        this.headTitle = 'Please correct the following errors:';
        this.messageLabelClass = 'message-label-error';
        this.errorMessagesService.messageSource.subscribe(serviceMsgs => {
          this.processMessages(serviceMsgs);
        });
        break;
      }
      case 'success': {
        this.messageClass = 'usa-alert--success';
        this.headTitle = 'Success Status';
        this.messageLabelClass = 'message-label-success';
        break;
      }
      default: {
        this.messageClass = 'usa-alert--error';
        this.headTitle = 'Error Status';
        this.messageLabelClass = 'message-label-error';
        break;
      }
    }
  }

  ngOnChanges(changes) {
    this.visible = !!changes.messages.currentValue && (changes.messages.currentValue.length > 0);
    if (changes.messages && changes.messages.currentValue && changes.messages.currentValue.length > 0) {
      this.processMessages(changes.messages.currentValue);
    }
  }

  private processMessages(messages: Message[]) {
    this.messages = messages;
    this.visible = !!this.messages && (this.messages.length > 0);
    let myComp = this;
    if (this.focusOnShow) {
      setTimeout(function () {
        myComp.element.nativeElement.focus();
      }, 0);
    }
  }

  close() {
    this.messages = [];
    this.visible = false;
  }

  navigateToPage($event) {
    this.actionEvent.next();
  }

}
