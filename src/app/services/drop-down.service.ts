import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable(
  { providedIn: 'root' }
)
export class DropDownService {

  constructor(private apiService: ApiService) {
  }

  findKeyInMap(map: any[], key: string): any {
    return map.find(x => +x.id === +key);
  }

  findValueInMap(map: any[], value: string): any {
    return map.find(x => x.value === value);
  }

  getValueFromArrayById(array: any[], id: number) {
    const item = array.find(x => x.id === id);
    return (item ? item.value : 'NA');
  }

  getStatesKeyValues(array: any[]) {
    let tempArray = [];
    for (let item of array) {
      if (item.stateId !== 1) { // 1 = Not Defined 
        tempArray.push({ id: item.stateId, value: item.stateName });
      }
    }
    return tempArray;
  }

}
