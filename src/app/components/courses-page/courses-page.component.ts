import { selectCoursesList } from 'src/app/store/courses/courses.selectors';
import {
  deleteCourseItem,
  getCoursesList,
} from './../../store/courses/courses.actions';
import { Store } from '@ngrx/store';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { Subscription, debounceTime, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  courses$: Observable<Course[]>;
  load = true;
  subscribtionOnSearch = new Subscription();

  constructor(
    private router: Router,
    private dataService: DataService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const start = '0';
    const count = '2';

    const params: { [key: string]: string } = {
      start: start,
      count: count,
    };

    this.store.dispatch(getCoursesList({ params }));
    this.courses$ = this.store.select(selectCoursesList);

    this.subscribtionOnSearch = this.dataService.searchData$
      .pipe(
        debounceTime(700),
        switchMap((data) => {
          this.load = true;
          if (data.length >= 3) {
            const params: { [key: string]: string } = {
              textFragment: data,
            };
            this.store.dispatch(getCoursesList({ params }));
          }
          return this.courses$;
        })
      )
      .subscribe(() => {
        this.load = false;
      });
  }

  ngOnDestroy(): void {
    this.subscribtionOnSearch.unsubscribe();
  }

  deleteCourse(id: string) {
    const result = prompt('Do you really want to delete this course?', 'yes');
    if (result === 'yes') {
      this.store.dispatch(deleteCourseItem({ id }));
    }
    console.log('delete id', id);
  }

  loadCourses() {
    this.load = false;
  }

  addCourse() {
    this.router.navigate(['/courses/new']);
  }

  trackById(index: number, course: Course): string {
    return course.id as string;
  }
}
