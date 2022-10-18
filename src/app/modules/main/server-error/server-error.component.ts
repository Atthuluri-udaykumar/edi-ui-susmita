import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ErrorMessagesService} from '../../shared-modules/general/error-messages/error-messages.service';
import {NavigationStart, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor(private titleService: Title, private errorService: ErrorMessagesService, private router: Router,
              private authService: AuthService, private session: SessionService) {
    this.errorService.http500.next(true);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.errorService.http500.next(false);
      }
    });
  }

  async ngOnInit() {
    this.titleService.setTitle('Under Maintenance | EDI');
    await this.session.logout(this.authService.validated);
    this.authService.logout(); // There is something wrong so maybe better just close the user session
  }

}
