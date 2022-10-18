import {WebStorageUtility} from '../utility/web-storage.utility';
import {Injectable} from '@angular/core';

export class WebStorageService {

  constructor(private storage: Storage) {
  }

  get(key: string): any {
    return WebStorageUtility.get(this.storage, key);
  }

  set(key: string, value: any): void {
    WebStorageUtility.set(this.storage, key, value);
  }

  remove(key: string): void {
    WebStorageUtility.remove(this.storage, key);
  }

  clear(): void {
    this.storage.clear();
  }

  clean(group: string) {
    WebStorageUtility.clean(this.storage, group);
  }
}

@Injectable()
export class LocalStorageService extends WebStorageService {
  constructor() {
    super(localStorage);
  }
}

@Injectable()
export class SessionStorageService extends WebStorageService {
  constructor() {
    super(sessionStorage);
  }
}
