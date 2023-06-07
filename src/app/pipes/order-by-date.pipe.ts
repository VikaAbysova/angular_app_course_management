import { Course } from 'src/app/interfaces/course.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
  transform(coursesList: Course[]): Course[] {
    return coursesList.sort(
      (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
    );
  }
}
