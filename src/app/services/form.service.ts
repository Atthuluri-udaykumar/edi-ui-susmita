import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import systemErrors from './system-errors';
import { inputLabels } from './labels';
import { selectLabels } from './labels';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  touchControls(form: FormGroup) {
    Object.keys(form.controls).forEach(
      key => {
        form.get(key).markAsTouched();
        form.get(key).updateValueAndValidity({ emitEvent: true });
      }
    );
  }

  touchControl(control: AbstractControl) {
    control.markAsTouched();
    control.updateValueAndValidity({ emitEvent: true });
  }

  getDateControlMessages(control: AbstractControl) {
    let errorMessages: any = [];
    let dobValue = control.value;
    if (!dobValue || !dobValue.month) {
      errorMessages.push({ detail: this.getEmptyErrorMessageStd('dobMonth') });
    } else if (control.errors.monthError) {
      errorMessages.push({ detail: this.getInvalidErrorMessageStd('dobMonth') });
    }
    if (!dobValue || !dobValue.day) {
      errorMessages.push({ detail: this.getEmptyErrorMessageStd('dobDay') });
    } else if (control.errors.dayError) {
      errorMessages.push({ detail: this.getInvalidErrorMessageStd('dobDay') });
    }
    if (!dobValue || !dobValue.year) {
      errorMessages.push({ detail: this.getEmptyErrorMessageStd('dobYear') });
    } else if (control.errors.yearError) {
      errorMessages.push({ detail: this.getInvalidErrorMessageStd('dobYear') });
    }
    if (control.errors.dobInvalid) {
      errorMessages.push({ detail: this.getInvalidErrorMessageStd('dob') });
    }
    return errorMessages;
  }

  validateControlsAndGetList(form: FormGroup, errorKey: string): any[] {
    let errorMessages: any[] = [];

    Object.keys(form.controls).forEach(
      key => {

        let message: string;
        if (form.get(key) instanceof FormControl && form.get(key).invalid) {
          if (key === 'dob') {
            errorMessages = errorMessages.concat(this.getDateControlMessages(form.get(key)));
          } else if (!form.get(key).value) {
            message = this.getEmptyErrorMessage(errorKey, key);
          } else if (form.get(key).invalid) {
            message = this.getInvalidErrorMessage(errorKey, key);
          }
        }
        if (message) {
          errorMessages.push({ detail: message });
        }
      }
    );

    return errorMessages;
  }

  getEmptyErrorMessage(errorKey, key): string {
    let message = systemErrors['error.' + errorKey + '.' + key + '.empty'];
    if (message) {
      return message;
    } else {
      message = systemErrors['error.generic.' + key + '.empty'];
      if (message) {
        return message;
      } else {
        return this.getEmptyErrorMessageStd(key);
      }
    }
  }

  getEmptyErrorMessageStd(key): string {
    let message = systemErrors['error.required.template'];
    let label = inputLabels[key];
    if (!label) {
      message = systemErrors['error.select.required.template'];
      label = selectLabels[key];
    }
    if (label) {
      message = message.replace(/{\$Field\$}/g, label);
      return message;
    }
    return '';
  }

  getInvalidErrorMessage(errorKey, key): string {
    let message = systemErrors['error.' + errorKey + '.' + key + '.invalid'];
    if (message) {
      return message;
    } else {
      message = systemErrors['error.generic.' + key + '.invalid'];
      if (message) {
        return message;
      } else {
        return this.getInvalidErrorMessageStd(key);
      }
    }
  }

  getInvalidErrorMessageStd(key): string {
    let message = systemErrors['error.invalid.template'];
    let label = inputLabels[key];
    if (label) {
      message = message.replace(/{\$Field\$}/g, label);
      return message;
    }
    return '';
  }

  getNotEqualErrorMessageStd(key): string {
    let message = systemErrors['error.notEqual.template'];
    let label = inputLabels[key];
    if (label) {
      message = message.replace(/{\$Field\$}/g, label);
      return message;
    }
    return '';
  }

  validateControlsAndGetMap(form: FormGroup, errorKey: string): Map<string, any[]> {
    let errorMap = new Map();

    Object.keys(form.controls).forEach(
      key => {
        errorMap.set(key, []);

        let message: string;
        if (form.get(key) instanceof FormControl && form.get(key).invalid) {
          if (key === 'dob') {
            errorMap.get(key).push(...this.getDateControlMessages(form.get(key)));
          } else if (!form.get(key).value) {
            message = this.getEmptyErrorMessage(errorKey, key);
          } else if (form.get(key).invalid) {
            message = this.getInvalidErrorMessage(errorKey, key);
          }
        }
        if (message) {
          errorMap.get(key).push({ detail: message });
        }
      }
    );

    return errorMap;
  }

  getErrorMapAsList(map: Map<string, any[]>): any[] {
    let errorMessages: any[] = [];
    for (let entry of Array.from(map.entries())) {
      errorMessages.push(...entry[1]);
    }
    return errorMessages;
  }

  additionalDobValidation(form: FormGroup, map: Map<string, any[]>) {
    if (!form.get('dob').valid) {
      if (form.get('dob').errors.future) {
        // Date Of Birth - IN FUTURE
        map.get('dob').push({ detail: systemErrors['error.generic.dateOfBirth.futureDate'] });
      }
    }
    return map;
  }

  resetForm(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
      form.get(key).setErrors(null);
      form.get(key).setValue('');
    });
  }
}
