import { Injectable } from '@angular/core';
import { EdiResponse } from '../model/edi-respose.model';
import systemErrors from './system-errors';
import { Message } from 'primeng-lts/api';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor() {
  }

  /**
   * Technically remove an error from the response
   * @param response Response object from backend
   * @param fieldName Error to ignore or remove
   */
   ignoreErrorFromResponse(response: EdiResponse, fieldName: string): EdiResponse {
    if (response && response.errors) {
      const length = response.errors.length;
      let position = 0;
      for (let i = 0; i < length; i++) {
        let error = response.errors[position];
        if (error.field && error.field.includes(fieldName)) {
          response.errors.splice(position, 1);
        } else {
          position++;
        }
      }
    }
    return response;
  }

  validateResponse(data: EdiResponse): any[] {
    let errors = [];
    if (!data) {
      errors.push(this.getErrorMessage('error.badResponse'));
    } else {
      if (data.errors) {
        errors.push(...this.handleError(data));
      } else {
        if (data.result === null) { // Will capture null and undefined
          errors.push(this.getErrorMessage('error.badResponse'));
        }
      }
    }
    return errors;
  }

  findError(response: EdiResponse, fieldName: string): boolean {
    if (response && response.errors) {
      for (let i = 0; i < response.errors.length; i++) {
        let error = response.errors[i];
        if (error.field && error.field.includes(fieldName)) {
          return true;
        }
      }
    }
    return false;
  }

  // contains(errors: Message[], value): boolean {
  //   errors.forEach((error) => {
  //     if (error && error.detail) {
  //       if (error.detail.includes(value)) {
  //         return true;
  //       }
  //     }
  //   });
  //   return false;
  // }

  handleError(errorJson): Message[] {
    let messages = [];
    if (errorJson.name) { // If it is a default http error
      messages.push({ detail: errorJson.error.error });
    } else {
      if (errorJson.errors) {
        errorJson.errors.forEach((value) => {
          messages.push({ detail: value.message, summary: value.field });
        });
      }
    }
    return messages;
  }

  getErrorMessage(key): any {
    return { detail: systemErrors[key] };
  }

  getWarnings(data: EdiResponse): any[] {
    const warnings = [];
    if (data && data.errors) {
      for (let item of data.errors) {
        if (item.field && item.field.includes('warning')) {
          warnings.push({ detail: item.message, summary: item.field });
        }
      }
    }
    return warnings;
  }
}
