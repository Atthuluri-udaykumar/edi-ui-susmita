import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {
  private _count: number = 0;
  private _timeoutSeconds: number = 5;
  private timerSubscription: Subscription;
  private timer: Observable<number>;
  private resetOnTrigger: boolean = false;
  public idleWarning: Subject<number> = new Subject<number>();

  public _expiredCounter: number = 60;
  private _expiredTimer: Observable<number>;
  private _expiredTimerSubscription: Subscription;
  public _timeoutExpiredLogOut: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  setTimeoutSeconds(seconds: number) {
    this._timeoutSeconds = seconds;
  }

  public startResetTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this._expiredTimerSubscription) {
      this._expiredTimerSubscription.unsubscribe();
    }

    this.timer = timer(this._timeoutSeconds * 1000);

    this.timerSubscription = this.timer.subscribe(n => {
      this.timerComplete(n);
    });
  }

  public stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this._expiredTimerSubscription) {
      this._expiredTimerSubscription.unsubscribe();
    }
  }

  private timerComplete(n: number) {
    this.idleWarning.next(++this._count);

    if (this.resetOnTrigger) {
      this.startResetTimer();
    }
  }

  public startIdleCountDown() {
    this._expiredTimer = timer(1000, 1000);
    this._expiredTimerSubscription = this._expiredTimer.subscribe(n => {
      this._expiredCounter--;
      if (this._expiredCounter === 0) {
        this._timeoutExpiredLogOut.next(true);
        this._expiredCounter = 60;
        this._expiredTimerSubscription.unsubscribe();
      }
    });
  }
}
