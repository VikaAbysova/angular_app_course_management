import { Course } from './../../interfaces/course.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from './../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
})
export class AddCoursePageComponent implements OnInit {
  date: string | Date;
  durationMin: number;
  param: string;

  course: Course = {
    id: '',
    name: '',
    description: '',
    date: new Date(Date.now()),
    durationMin: 0,
    isTopRated: false,
  };

  constructor(
    private coursesService: CoursesService,
    private spinnerService: SpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.param = params['id'];

      if (Number(+this.param)) {
        console.log('param', this.param);

        this.coursesService
          .getItemById(this.param)
          .subscribe(
            (course) => (
              (this.course = course),
              (this.date = course.date),
              (this.durationMin = course.durationMin as number)
            )
          );
      }
      this.date = this.course.date;
      this.durationMin = this.course.durationMin as number;
      return;
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
      this.coursesService.createCourse(this.course).subscribe(() => {
        this.coursesService.getList(), this.spinnerService.showLoading(false);
      });
    } else {
      this.coursesService
        .updateItem(this.course, +this.course.id)
        .subscribe(() => this.spinnerService.showLoading(false));
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
