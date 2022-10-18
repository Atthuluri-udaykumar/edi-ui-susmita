import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LoginPasswordService {

  submitEvent: Subject<boolean> = new Subject();

  constructor() {
  }
}
