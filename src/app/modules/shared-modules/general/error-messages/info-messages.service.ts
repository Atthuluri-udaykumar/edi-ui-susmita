import {Injectable} from '@angular/core';
import {ErrorMessagesService} from './error-messages.service';

@Injectable({
  providedIn: 'root'
})
export class InfoMessagesService extends ErrorMessagesService {
}
