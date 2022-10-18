import { Injectable } from '@angular/core';
import { Message } from 'primeng-lts/api';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  messages: Message[] = [];
  messageSource = new Subject<Message[]>();

  http500: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  add(message: Message) {
    if (message) {
      this.messages.push(message);
      this.messageSource.next(this.messages);
    }
  }

  addAll(messages: Message[]) {
    if (messages && messages.length) {
      this.messages.push(...messages);
      this.messageSource.next(this.messages);
    }
  }

  clear() {
    if (this.messages.length > 0) {
      this.messages = [];
      this.messageSource.next(null);
    }
  }

  getMessageWithLink(message: string, link: string) {
    let arr: string[] = message.split('$$$$');
    let detailAfterLink = '';
    let detailBeforeLink = '';
    if (arr && arr.length > 0) {
      detailBeforeLink = arr[0];
      detailAfterLink = arr.length > 1 ? arr[1] : '';
    }

    return { detail: '', hasLink: true, detailAfterLink: detailAfterLink, detailBeforeLink: detailBeforeLink, linkText: link };
  }
}
