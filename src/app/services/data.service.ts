import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  searchData$ = new Subject<string>();

  raiseDataKeyupEvent(data: string) {
    this.searchData$.next(data);
  }
}
