import { debounceTime, fromEvent, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { getCoursesList } from 'src/app/store/courses/courses.actions';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent {
  constructor(private store: Store) {}

  handlerKeyupEvent(event: KeyboardEvent): void {
    fromEvent(event.target as EventTarget, 'keyup')
      .pipe(
        debounceTime(1500),
        switchMap(() => {
          const dataValue = (event.target as HTMLInputElement).value;
          if (dataValue.length >= 3) {
            const params: { [key: string]: string } = {
              textFragment: dataValue,
            };
            this.store.dispatch(getCoursesList({ params }));
          }
          if (dataValue.length === 0) {
            this.store.dispatch(getCoursesList({}));
          }
          return of(null);
        })
      )
      .subscribe();
  }
}
