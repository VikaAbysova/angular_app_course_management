import { HttpResponse } from '@angular/common/http';
import { Course } from './../../interfaces/course.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from './../../services/courses.service';
import { Component, OnInit } from '@angular/core';

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
    date: new Date(),
    durationMin: 0,
    isTopRated: false,
  };

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.param = params['id'];

      if (Object.keys(params)[0] === 'id') {
        this.course = {
          ...(this.coursesService.getItemById(this.param) as Course),
        };
        this.date = this.course.date;
        this.durationMin = this.course.durationMin as number;
        return;
      }
    });
  }

  setDate(date: string | Date): void {
    this.course.date = date as string;
  }

  setDuration(minutes: number): void {
    this.course.durationMin = minutes;
  }

  onSave(e: Event) {
    e.preventDefault();
    if (this.param === 'new') {
      this.coursesService
        .createCourse(this.course)
        .subscribe((response: HttpResponse<object>) => {
          if (response.status === 201) {
            this.coursesService.getList();
          }
        });
    } else {
      this.coursesService.updateItem(this.course, +this.course.id).subscribe();
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
