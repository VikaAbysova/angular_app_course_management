import { coursesList } from '../../mocks/courses.mock';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/сourse.interface';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[];

  ngOnInit() {
    this.courses = coursesList;
  }

  deleteCourse(id: string) {
    console.log('delete id', id);
  }

  trackById(index: number, course: Course): string {
    return course.id;
  }
}
