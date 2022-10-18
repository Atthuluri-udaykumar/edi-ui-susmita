import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'app-side-menu'
})
export class SideMenuIconDirective implements AfterViewInit, OnChanges {

  @Input() public items: any;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.removeRole();
    this.ariaDisabled();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.removeRole();
      this.ariaDisabled();
    }
  }

  ariaDisabled() {
    let _this = this;
    setTimeout(function () {
      // 508 remove role to alow screen reader see links
      let listOfMenuElements = _this.element.nativeElement.querySelectorAll('.p-disabled');

      for (let menuItem of listOfMenuElements) {
        _this.renderer.setAttribute(menuItem, 'aria-disabled', "true");
      }
    }, 0);
  }

  removeRole() {
    let _this = this;
    setTimeout(function () {
      // 508 remove role to alow screen reader see links
      let listOfMenuElements = _this.element.nativeElement.querySelectorAll('[role="tree"]');

      for (let menuItem of listOfMenuElements) {
        _this.renderer.removeAttribute(menuItem, 'role');
      }

      listOfMenuElements = _this.element.nativeElement.querySelectorAll('[role="treeitem"]');

      for (let menuItem of listOfMenuElements) {
        _this.renderer.removeAttribute(menuItem, 'role');
      }
    }, 0);
  }

}
