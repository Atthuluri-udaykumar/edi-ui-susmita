import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-version',
  template: 'Version Number: {{version}}',
  styles: []
})
export class VersionComponent implements OnInit {

  version = environment.version;

  constructor() {
  }

  ngOnInit(): void {
  }

}
