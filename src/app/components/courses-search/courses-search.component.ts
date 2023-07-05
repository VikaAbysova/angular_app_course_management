import { debounceTime, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { getCoursesList } from 'src/app/store/courses/courses.actions';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent implements OnInit {
  form: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(''),
    });

    this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(1500),
        switchMap(() => {
          const dataValue = this.form.get('search')?.value;
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
