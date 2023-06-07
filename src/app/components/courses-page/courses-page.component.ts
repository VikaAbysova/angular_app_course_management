import { OrderByDatePipe } from './../../pipes/order-by-date.pipe';
import { FilterCoursesPipe } from './../../pipes/filter-courses.pipe';
import { coursesList } from '../../mocks/courses.mock';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  constructor(
    private orderByDatePipe: OrderByDatePipe,
    private filterCoursesPipe: FilterCoursesPipe
  ) {}
  courses: Course[];

  ngOnInit(): void {
    this.courses = coursesList;
  }

  applyFilter(courseTitle: string): void {
    const filteredCourses: Course[] = this.filterCoursesPipe.transform(
      courseTitle,
      coursesList
    );
    this.courses = filteredCourses;
  }

  deleteCourse(id: string) {
    console.log('delete id', id);
  }

  trackById(index: number, course: Course): string {
    return course.id;
  }
}
