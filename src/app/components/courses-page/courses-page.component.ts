import { selectCoursesList } from 'src/app/store/courses/courses.selectors';
import {
  deleteCourseItem,
  getCoursesList,
} from './../../store/courses/courses.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  courses$: Observable<Course[]>;
  load = true;
  // subscribtionOnSearch = new Subscription();

  constructor(
    private router: Router,
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
  }

  deleteCourse(id: string) {
    const result = prompt('Do you really want to delete this course?', 'yes');
    if (result === 'yes') {
      this.store.dispatch(deleteCourseItem({ id }));
    }
    console.log('delete id', id);
  }

  loadCourses(isLoading: boolean) {
    this.load = isLoading;
  }

  addCourse() {
    this.router.navigate(['/courses/new']);
  }

  trackById(index: number, course: Course): string {
    return course.id as string;
  }
}
