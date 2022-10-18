import { Directive, ElementRef, EventEmitter, HostListener, Input, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

const DISABLE_TIME = 300;

@Directive({
  selector: '[appNoDblClick]'
})
export class NoDblClickDirective {

  @Input('appNoDblClick') reenableButton: EventEmitter<boolean>;
  subscription: Subscription;

  constructor(private renderer: Renderer2,
    private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  clickEvent() {
    this.el.nativeElement.setAttribute('disabled', 'true');
    if (!this.reenableButton) {
      setTimeout(() => this.el.nativeElement.removeAttribute('disabled'), DISABLE_TIME);
    }
  }

  ngOnInit() {
    this.subscription = this.reenableButton.subscribe(value => {
      if (!value) this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
