import { OrderByDatePipe } from '../../pipes/order-by-date.pipe';
import { FilterCoursesPipe } from '../../pipes/filter-courses.pipe';
import { coursesList } from '../../mocks/courses.mock';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  constructor(
    private orderByDatePipe: OrderByDatePipe,
    private filterCoursesPipe: FilterCoursesPipe,
    private coursesService: CoursesService
  ) {}

  courses: Course[];

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

  applyFilter(courseTitle: string): void {
    this.courses = this.filterCoursesPipe.transform(courseTitle, coursesList);
  }

  deleteCourse(id: string) {
    this.coursesService.removeItem(id);
    const result = prompt('Do you really want to delete this course?', 'no');
    result === 'yes'
      ? (this.courses = this.coursesService.getList())
      : this.courses;
    console.log('delete id', id);
  }

  trackById(index: number, course: Course): string {
    return course.id;
  }
}
