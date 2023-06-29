import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { HandleErrorService } from './handle-error.service';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class CoursesService extends HandleErrorService {
  coursesList: Course[] = [];

  constructor(private http: HttpClient) {
    super();
  }

  getList(params?: HttpParams): Observable<Course[]> {
    params = params
      ? params.append('sort', 'date')
      : new HttpParams().append('sort', 'date');
    return this.http
      .get<Course[]>(`${environment.baseUrl}/courses`, { params })
      .pipe(
        map((courses: Course[]) =>
          courses.map((course: Course) => {
            return {
              ...course,
              id: course.id.toString(),
              date: new Date(course.date),
            };
          })
        ),
        catchError(this.handleError)
      );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http
      .post<Course>(`${environment.baseUrl}/courses`, course)
      .pipe(catchError(this.handleError));
  }

  getItemById(id: string): Observable<Course> {
    return this.http
      .get<Course>(`${environment.baseUrl}/courses/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateItem(course: Course, id: number): Observable<Course> {
    return this.http
      .patch<Course>(`${environment.baseUrl}/courses/${id}`, course)
      .pipe(catchError(this.handleError));
  }

  removeItem(id: string): Observable<Course> {
    console.log('remove', id);
    return this.http
      .delete<Course>(`${environment.baseUrl}/courses/${id}`)
      .pipe(catchError(this.handleError));
  }
}
