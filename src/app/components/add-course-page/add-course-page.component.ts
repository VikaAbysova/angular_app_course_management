import { getCoursesList } from './../../store/courses/courses.actions';
import {
  getCourseItem,
  addCourse,
  editCourseItem,
} from './../../store/course/course.actions';
import { selectCourse } from './../../store/course/course.selectors';
import { Store } from '@ngrx/store';
import { Course } from './../../interfaces/course.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
})
export class AddCoursePageComponent implements OnInit {
  date: string | Date;
  durationMin: number;
  param: string;
  course$: Observable<Course>;

  course: Course = {
    id: '',
    name: '',
    description: '',
    date: new Date(Date.now()),
    durationMin: 0,
    isTopRated: false,
  };

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.course$ = this.store.select(selectCourse);

    this.route.params.subscribe((params: Params) => {
      this.param = params['id'];

      if (Number(+this.param)) {
        console.log('param', this.param);
        const id = this.param;
        this.store.dispatch(getCourseItem({ id }));
        this.course$.subscribe(
          (course) => (
            (this.course = { ...course }),
            (this.date = course.date),
            (this.durationMin = course.durationMin as number)
          )
        );
      }
      this.date = this.course.date;
      this.durationMin = this.course.durationMin as number;
    });
  }

  setDate(date: string | Date): void {
    this.course.date = date as string;
  }

  setDuration(minutes: number): void {
    this.course.durationMin = minutes;
  }

  onSave() {
    this.spinnerService.showLoading(true);
    if (this.param === 'new') {
      this.store.dispatch(addCourse({ course: this.course }));
      this.course$.pipe(
        tap(() => {
          this.store.dispatch(getCoursesList({}));
        })
      );
    } else {
      this.store.dispatch(
        editCourseItem({ course: this.course, id: Number(this.course.id) })
      );
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
