import {Injectable} from '@angular/core';
import {HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingSpinnerService {

  onLoadingChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Stores all currently active requests
   */
  private requests: HttpRequest<any>[] = [];

  /**
   * Adds request to the storage and notifies observers
   */
  onStarted(req: HttpRequest<any>): void {
    this.requests.push(req);
    this.notify();
  }

  /**
   * Removes request from the storage and notifies observers
   */
  onFinished(req: HttpRequest<any>): void {
    let index = this.requests.indexOf(req);
    if (index === -1) {
      index = this.requests.findIndex(element => {
        return element.urlWithParams === req.urlWithParams
          && element.method === req.method
          && element.body === req.body;
      });
    }

    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify();
  }

  /**
   * Notifies observers about whether there are any requests on fly
   */
  private notify(): void {
    this.onLoadingChanged.next(this.requests.length !== 0);
  }
}
