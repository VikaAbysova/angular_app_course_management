import { coursesList } from '../../data/data-courses';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course.interface';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[];

  ngOnInit(courses = coursesList) {
    this.courses = courses;
  }

  deleteCourse(id: string) {
    console.log('delete id', id);
  }

  trackById(index: number, course: Course): string {
    return course.id;
  }
}
