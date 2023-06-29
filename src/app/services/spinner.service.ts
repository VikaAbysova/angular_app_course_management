import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  isLoading$ = new Subject<boolean>();

  showLoading(show: boolean) {
    this.isLoading$.next(show);
  }
}
