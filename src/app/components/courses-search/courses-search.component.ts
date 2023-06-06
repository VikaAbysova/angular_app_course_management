import { coursesList } from './../../mocks/courses.mock';
import { Course } from 'src/app/interfaces/course.interface';
import { FilterCoursesPipe } from './../../pipes/filter-courses.pipe';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent {
  searchCourse = '';
  courses: Course[] = coursesList;

  @Output() updateCourses: EventEmitter<Course[]> = new EventEmitter<
    Course[]
  >();

  constructor(private filterCoursesPipe: FilterCoursesPipe) {}

  searchClick() {
    const filteredCourses = this.filterCoursesPipe.transform(
      this.searchCourse,
      this.courses
    );
    console.log(this.searchCourse);

    this.updateCourses.emit(filteredCourses);
  }
}
