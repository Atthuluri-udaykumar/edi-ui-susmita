import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: 'p-table'
})
export class TableDirective implements AfterViewInit {

  message: any;

  @Input() fieldMap: any;
  @Input() tableCaption: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {

    let table = this.elRef.nativeElement.querySelector('table');

    
    if (table) {
      this.renderer.removeAttribute(table, 'role');
      this.renderer.setAttribute(table, 'role', 'table');
    }

    // let table = caption.children[0];
    // let title = this.renderer.createElement('caption');
    // let titleText = this.renderer.createText(this.tableCaption);
    // this.renderer.addClass(title, 'captionTable');
    // this.renderer.appendChild(title, titleText);
    // this.renderer.appendChild(table, title);
  }

  @HostListener('onSort', ['$event'])
  onSort(event) {
    // let dash = this.elRef.nativeElement.querySelector('#dash');
    // let areaUpdated = this.elRef.nativeElement.querySelector('#captionUpdated');
    // if (areaUpdated) {
    //   let orderMsg = '';
    //   if (event.order > 0) {
    //     orderMsg = 'ascending';
    //   } else {
    //     orderMsg = 'descending';
    //   }

    //   areaUpdated.innerHTML = '';
    //   this.message = this.renderer.createText(' Sorted by ' + this.fieldMap[event.field] + ' : ' + orderMsg);
    //   this.renderer.appendChild(areaUpdated, this.message);

    //   this.renderer.setStyle(dash, 'visibility', 'visible');
    // }
  }

  @HostListener('onFilter', ['$event'])
  onFilter(event) {
    let areaUpdated = this.elRef.nativeElement.querySelector('#tableSummary');
    if (areaUpdated) {
      areaUpdated.innerHTML = '';
      if (event.filteredValue.length > 1) {
        this.message = this.renderer.createText(' Displaying ' + event.filteredValue.length + ' records.');
      } else {
        if(event.filteredValue.length == 1){
        this.message = this.renderer.createText(' Displaying ' + event.filteredValue.length + ' record.');
        }else{
          this.message = this.renderer.createText('No records found.');
        }
      }
      this.renderer.appendChild(areaUpdated, this.message);
    }
  }

}
