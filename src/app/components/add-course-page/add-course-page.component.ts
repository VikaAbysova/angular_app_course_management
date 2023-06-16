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
  creationDate: string | Date;
  durationMin: number;
  param: string;

  course: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: new Date(),
    durationMin: 0,
    topRated: false,
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
        this.creationDate = this.course.creationDate;
        this.durationMin = this.course.durationMin as number;
        return;
      }
      this.course.id = Math.random().toString().slice(2);
    });
  }

  setDate(date: string | Date): void {
    this.course.creationDate = date as string;
  }

  setDuration(minutes: number): void {
    this.course.durationMin = minutes;
  }

  onSave() {
    if (this.param === 'new') {
      this.coursesService.createCourse({
        ...this.course,
        id: Math.random().toString().slice(2),
      });
    } else {
      this.coursesService.updateItem(this.course);
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
