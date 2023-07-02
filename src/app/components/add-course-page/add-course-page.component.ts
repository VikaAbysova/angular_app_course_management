import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
})
export class AddCoursePageComponent implements OnInit {
  // date: string | Date | null;
  // durationMin: string;
  param: string;
  course$: Observable<Course>;
  form: FormGroup;

  course: Course = {
    id: '',
    name: '',
    description: '',
    date: '',
    durationMin: '',
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

    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      date: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/),
      ]),
      duration: new FormControl('', [
        Validators.required,
      ]),
    });

    this.route.params.subscribe((params: Params) => {
      this.param = params['id'];

      if (Number(+this.param)) {
        console.log('param', this.param);
        const id = this.param;
        this.store.dispatch(getCourseItem({ id }));
        this.course$.subscribe((course) => {
          const date = new Date(course.date).toLocaleString().split(',')[0];
          this.course = {
            ...course,
            date: date,
          };
          if (course.durationMin === undefined) {
            this.course.durationMin = '0';
          }
        });
      }
    });
  }

  onSave() {
    this.spinnerService.showLoading(true);
    const course = {
      ...this.course,
      date: new Date(this.course.date).toString(),
    };
    if (this.param === 'new') {
      this.store.dispatch(addCourse({ course }));
    } else {
      this.store.dispatch(
        editCourseItem({ course, id: Number(this.course.id) })
      );
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
