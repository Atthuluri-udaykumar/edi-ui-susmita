import {Directive, Input} from '@angular/core';

import {NgControl} from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    setTimeout(() => this.ngControl.control[action]()); // Temp Fix pending ticket 35330 in Git
  }

  constructor(private ngControl: NgControl) {
  }

}
