import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {environmentLoader as environmentLoaderPromise} from './environments/environment-loader';

environmentLoaderPromise.then(env => {
  if (env.name === 'pro') {
    environment.production = true;
    environment.url = 'https://www.cob.cms.hhs.gov';
    environment.webServiceEndpoint = environment.url + '/edi/api';
    enableProdMode();
  }

  if (env.name === 'imp') {
    environment.url = 'https://www.imp.cob.cms.hhs.gov';
    environment.webServiceEndpoint = environment.url + '/edi/api';
  }

  if (env.name === 'local') {
    environment.url = 'http://localhost:8080';
    environment.webServiceEndpoint = environment.url + '/edi/api';
  }

  if (env.version !== '$BUILD_NUMBER') {
    environment.version = env.version;
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
