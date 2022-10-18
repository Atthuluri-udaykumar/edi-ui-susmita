import {NgModule} from '@angular/core';
import {LocalStorageService, SessionStorageService} from './service/web-storage.service';

export {LocalStorageService, SessionStorageService} from './service/web-storage.service';
export {LocalStorage, SessionStorage} from './decorator/webstorage';

@NgModule({
  providers: [LocalStorageService, SessionStorageService]
})
export class WebStorageModule {
}
