import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng-lts/api';
import { clone, cloneDeep } from "lodash"

@Injectable()
export class SideMenuService {

  constructor() {
  }

  public removeParentRouterLinkFromDisabled(items: MenuItem[]): MenuItem[] {
    return items.map((item) => {
      if (item.disabled) {
        item.routerLink = null;
      }
      return item;
    });
  }

  deactivateHiddenDisabled(originalItems: MenuItem[], currentItems: MenuItem[]) {
    let tItems = cloneDeep(currentItems);
    let index = 0;
    for (let tItem of tItems) {
      tItem.expanded = currentItems[index].expanded;
      if (tItem.disabled) {
        tItem.tabindex = '-1';
        tItem.routerLink = null;
      }
      if (tItem.items) {
        let sIndex = 0;
        for (let tsItem of tItem.items) {
          if (tsItem.disabled) {
            tsItem.tabindex = '-1';
            tsItem.routerLink = null;
          } else if (tItem.expanded && !tItem.disabled) {
            tsItem.tabindex = '0';
            tsItem.routerLink = originalItems[index].items[sIndex].routerLink;
          } else {
            tsItem.tabindex = '-1';
            tsItem.routerLink = null;
          }
          sIndex++;
        }
      }
      index++;
    }

    return tItems;
  }
}
