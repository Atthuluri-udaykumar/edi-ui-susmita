import {Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Optional, Output, Renderer2, Self, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgControl} from '@angular/forms';
import systemErrors from '../../../../services/system-errors';

@Component({
  selector: 'app-rds-list',
  templateUrl: './rds-list.component.html',
  styleUrls: ['./rds-list.component.css']
})
export class RdsListComponent implements OnInit, ControlValueAccessor {

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Input() label: string = '';

  @Input() items: any = [];
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() describedBy: string = '';
  @Input() action: string = '';

  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  hasErrors: boolean = false;
  errorMessage: string = '';
  control: AbstractControl;

  listForm: FormGroup;
  selectItem: FormControl;

  selectedItems: any = [];

  constructor(@Optional() @Self() public controlDir: NgControl, public renderer: Renderer2) {
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    this.control = this.controlDir.control;
    this.selectItem = new FormControl(null);

    this.listForm = new FormGroup({
      selectItem: this.selectItem
    });
  }

  public onTouched(event) {
    this.propagateTouched();
    this.blur.emit(event);
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => {};
  // the method set in registerOnTouched to emit changes back to the form
  private propagateTouched: any = () => {};

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.propagateChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.propagateTouched = fn;
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(val: any): void {
    if (val) {
      this.selectedItems = val;
    }
  }

  assign() {
    const selected = this.listForm.get('selectItem').value;
    if (selected && selected !== '- Select one -') {
      const itemSelected = this.items.find(element => element.id.toString() === selected.toString());
      this.selectedItems.push(itemSelected);
      this.selectedItems = this.removeDuplicates(this.selectedItems);
      this.propagateChange(this.selectedItems);
      this.propagateTouched();
    }
  }

  addNew() {
  }

  actionMethod(item) {
  }

  remove(item) {
    this.selectedItems = this.removeElement(this.selectedItems, item);
    this.propagateChange(this.selectedItems);
    this.propagateTouched();
  }

  removeDuplicates(array): any[] {
    let unique = [];
    // tslint:disable-next-line:no-shadowed-variable
    array.forEach(element => {
      if (!unique.find(x => x.id === element.id)) {
        unique.push(element);
      }
    });
    return unique;
  }

  removeElement(array, item): any[] {
    let unique = [];
    // tslint:disable-next-line:no-shadowed-variable
    array.forEach(element => {
      if (element.id !== item.id) {
        unique.push(element);
      }
    });
    return unique;
  }

}
