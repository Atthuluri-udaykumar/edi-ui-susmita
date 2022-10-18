import {Injectable} from '@angular/core';
import {SessionService} from '../services/session.service';

@Injectable()
export class MockSessionService extends SessionService {

  async logout(outOfSessionPage: boolean) {
    return;
  }

}
