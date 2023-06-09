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
  courses: Course[];
  constructor(
    private orderByDatePipe: OrderByDatePipe,
    private filterCoursesPipe: FilterCoursesPipe,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

  applyFilter(courseTitle: string): void {
    this.courses = this.filterCoursesPipe.transform(courseTitle, coursesList);
  }

  deleteCourse(id: string) {
    const result = prompt('Do you really want to delete this course?', 'yes');
    if (result === 'yes') {
      this.coursesService.removeItem(id);
      this.courses = this.coursesService.getList();
    }
    console.log('delete id', id);
  }

  trackById(index: number, course: Course): string {
    return course.id;
  }
}
