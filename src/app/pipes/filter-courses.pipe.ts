import { Course } from 'src/app/interfaces/course.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourses',
})
export class FilterCoursesPipe implements PipeTransform {
  transform(input: string, coursesList: Course[]): Course[] {
    return coursesList.filter((course) =>
      course.title.toLowerCase().includes(input.toLowerCase())
    );
  }
}
