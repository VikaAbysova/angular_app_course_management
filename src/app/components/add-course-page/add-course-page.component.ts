import { Authors } from './../../interfaces/authors.interface';
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
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
})
export class AddCoursePageComponent implements OnInit {
  param: string;
  course$: Observable<Course>;
  form: FormGroup;

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private translate: TranslateService,
    private langService: LangService,
  ) {}

  ngOnInit(): void {
    this.translate.use(this.langService.getCurrentLang() as string);

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
      duration: new FormControl('', [Validators.required]),
      authors: new FormControl([], [Validators.minLength(1)]),
    });

    this.route.params.subscribe((params: Params) => {
      this.param = params['id'];

      if (Number(+this.param)) {
        const id = this.param;
        this.store.dispatch(getCourseItem({ id }));
        this.course$.subscribe((course) => {
          const date = new Date(course.date).toLocaleString().split(',')[0];
          this.form.get('title')?.patchValue(course.name);
          this.form.get('description')?.patchValue(course.description);
          this.form.get('date')?.patchValue(date);
          this.form
            .get('duration')
            ?.patchValue(course.durationMin ? course.durationMin : '0');
          this.form
            .get('authors')
            ?.patchValue([...(course.authors as Authors[])]);
        });
      }
    });
  }

  onSave() {
    this.spinnerService.showLoading(true);
    const course: Course = {
      id: '',
      isTopRated: false,
      name: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      date: new Date(this.form.get('date')?.value).toString(),
      durationMin: this.form.get('duration')?.value,
      authors: this.form.get('authors')?.value,
    };
    if (this.param === 'new') {
      this.store.dispatch(addCourse({ course }));
    } else {
      this.store.dispatch(editCourseItem({ course, id: Number(this.param) }));
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }

  showErrorText(controlName: string): string | void {
    const controlField = this.form.get(controlName);
    if (controlField?.hasError('required')) {
      return `${controlName} shouldn't be empty`;
    }
    if (controlField?.hasError('maxlength')) {
      const maxLength: number =
        controlField.getError('maxlength').requiredLength;
      return `${controlName} shouldn't be more than ${maxLength} characters`;
    }
    if (controlField?.hasError('pattern') && controlName === 'date') {
      return `Check charackters. Date should be in the format MM/DD/YYYY.`;
    }
    if (
      controlField?.hasError('restrictedDateMore') &&
      controlName === 'date'
    ) {
      return `Date shouldn't be more than 31`;
    }
    if (
      controlField?.hasError('restrictedMonthMore') &&
      controlName === 'date'
    ) {
      return `Month shouldn't be more than 12`;
    }
    if (
      controlField?.hasError('restrictedDateInFebruary') &&
      controlName === 'date'
    ) {
      return `Date shouldn't be more than 28 in February`;
    }
    if (controlField?.hasError('invalidNumber') && controlName === 'duration') {
      return `Restricted character. Duration must be digits only`;
    }
    if (controlField?.hasError('emptyAuthors') && controlName === 'authors') {
      return `At least one author is required`;
    }
  }
}
