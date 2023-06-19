import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpParams } from '@angular/common/http';
import { Course } from 'src/app/interfaces/course.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourses',
})
export class FilterCoursesPipe implements PipeTransform {
  constructor(private coursesService: CoursesService) {}

  transform(term?: string): Observable<Course[]> {
    let params = new HttpParams();
    params = term?.trim() ? params.append('textFragment', term) : params;
    return this.coursesService.getList(params);
  }
}
