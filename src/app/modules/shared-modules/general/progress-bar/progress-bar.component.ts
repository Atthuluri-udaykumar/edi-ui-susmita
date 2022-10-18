import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

export class WizardState {
  name: string;
  isCurrent: boolean = false;
  isComplete: boolean = false;
  isDisabled: boolean = true;
  isInvalid: boolean = false;
}

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @Input() states: WizardState[];

  @Output() current: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('bar', { static: true }) element: ElementRef;

  initialOffsetTop: number;
  fixed: number;
  dummyActive: boolean = false;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.initialOffsetTop = this.element.nativeElement.offsetTop;
    this.fixed = this.initialOffsetTop - 118; /// ---> number corresponds to offset top of menubar
  }

  setCurrent(state) {
    if (!state.isDisabled) {
      for (let y = 0; y < this.states.length; y++) {
        this.states[y].isCurrent = false;
      }
      state.isCurrent = true;
      this.current.emit(this.states.findIndex(x => x.name === state.name));
    }
  }

  @HostListener('window:scroll', []) onScroll() {
    this.floatFunction();
  }

  floatFunction() {

    if (window.pageYOffset >= 118) {
      this.renderer.setStyle(this.element.nativeElement, 'top', this.fixed + 'px');
      this.renderer.setStyle(this.element.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.element.nativeElement, 'left', '50%');
      this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateX(-50%)');
      this.renderer.setStyle(this.element.nativeElement, 'width', 'fit-content');
      this.dummyActive = true;
    }

    if (window.pageYOffset < 118) {
      this.renderer.removeStyle(this.element.nativeElement, 'top');
      this.renderer.removeStyle(this.element.nativeElement, 'position');
      this.renderer.removeStyle(this.element.nativeElement, 'left');
      this.renderer.removeStyle(this.element.nativeElement, 'transform');
      this.dummyActive = false;
    }
  }

}
