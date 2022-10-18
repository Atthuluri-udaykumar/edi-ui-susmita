import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  readonly defaultGuideUrl: string = '/?q=user-guide/rds-user-guide';

  _helpIconUrl: string = '';

  getHelpIconUrl(): string {
    return this._helpIconUrl ? this._helpIconUrl : this.defaultGuideUrl;
  }

  setHelpIconUrl(newUrl: string): void {
    this._helpIconUrl = newUrl;
  }

}
