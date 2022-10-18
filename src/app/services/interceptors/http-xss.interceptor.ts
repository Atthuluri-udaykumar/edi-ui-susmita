import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {XSS} from '../edi-validators';
import {Observable, throwError as observableThrowError} from 'rxjs';

@Injectable()
export class HttpXssInterceptor implements HttpInterceptor {
  constructor() {
  }

  XSSPresent: boolean = false;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.XSSPresent = false;

    let response: HttpErrorResponse = new HttpErrorResponse({error: 'Possible XSS or SQL injection attack'});

    if (request.body) {
      this.traverse(request.body);
      if (this.XSSPresent) {
        return observableThrowError(response);
      }
    }

    for (let key of request.params.keys()) {
      if (XSS.test(request.params.get(key))) {
        return observableThrowError(response);
      }
    }

    return next.handle(request);
  }

  traverse(jsonObj) {
    if (jsonObj && typeof jsonObj === 'object') {
      Object.entries(jsonObj).forEach(([key, value]) => {
        // key is either an array index or object key
        this.traverse(value);
      });
    } else {
      // jsonObj is a number or string
      if (XSS.test(jsonObj)) {
        this.XSSPresent = true;
      }
    }
  }
}
