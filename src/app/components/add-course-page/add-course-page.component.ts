import { Course } from './../../interfaces/course.interface';
import { Router } from '@angular/router';
import { CoursesService } from './../../services/courses.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
})
export class AddCoursePageComponent {
  title: string;
  description: string;
  creationDate = new Date();
  durationMin: number;
  topRated: false;

  constructor(private coursesService: CoursesService, private router: Router) {}

  onSave() {
    const newCourse: Course = {
      id: Math.random().toString().slice(2),
      title: this.title,
      description: this.description,
      creationDate: this.creationDate,
      durationMin: this.durationMin,
      topRated: this.topRated,
    };
    this.coursesService.createCourse(newCourse);
    this.router.navigate(['/courses']);
    console.log('newCourse', newCourse);
  }

  onCancel() {
    console.log('Cancel');
  }
}
