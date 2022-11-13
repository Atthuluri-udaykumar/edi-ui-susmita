// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let url = 'https://www.dev.cob.cms.hhs.gov';
// let url = 'http://xxxxxx.elb.amazonaws.com:8081'

let endpoint = url + '/edi/api';

let version = 0;
export const environment = {
  name: 'dev',
  production: false,
  url: url,
  webServiceEndpoint: endpoint,
  version: version,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
