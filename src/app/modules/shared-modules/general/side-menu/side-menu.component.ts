import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng-lts/api';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit, OnChanges {
  @Input() items: MenuItem[];

  expanded = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.updateStatusIcons();
    }
  }

  updateStatusIcons() {
    for (let item of this.items) {
      if (item.badge === 'check') {
        item.styleClass = item.styleClass ? item.styleClass.includes('checked') ? item.styleClass : item.styleClass + ' checked' : 'checked';
      } else if (item.badge === 'exclamation') {
        item.styleClass = item.styleClass ? item.styleClass.includes('exclamation') ? item.styleClass : item.styleClass + ' exclamation' : 'exclamation';
      }
      if (item.items) {
        for (let subItem of item.items) {
          if (subItem.badge === 'check') {
            subItem.styleClass = subItem.styleClass ? subItem.styleClass.includes('checked') ? subItem.styleClass : item.styleClass + ' checked' : 'checked';
          } else if (subItem.badge === 'exclamation') {
            subItem.styleClass = subItem.styleClass ? subItem.styleClass.includes('exclamation') ? subItem.styleClass : subItem.styleClass + ' exclamation' : 'exclamation';
          }
        }
      }
    }
  }
}
