import { coursesList } from '../../mocks/courses.mock';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  constructor(private orderByPipe: OrderByPipe) {}
  courses: Course[];

  ngOnInit(): void {
    const courses = coursesList;
    this.courses = this.orderByPipe.transform(courses);
  }

  applyFilter(filteredCourses: Course[]): void {
    this.courses = filteredCourses;
  }

  deleteCourse(id: string) {
    console.log('delete id', id);
  }

  trackById(index: number, course: Course): string {
    return course.id;
  }
}
