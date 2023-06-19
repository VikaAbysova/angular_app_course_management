import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { HandleErrorService } from './handle-error.service';
import { catchError, map, Observable, tap } from 'rxjs';
import { COURSES_URL } from '../constants/urls.consts';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  coursesList: Course[] = [];

  constructor(
    private http: HttpClient,
    private errorService: HandleErrorService
  ) {}

  getList(params?: HttpParams): Observable<Course[]> {
    return this.http.get<Course[]>(COURSES_URL, { params }).pipe(
      map((courses: Course[]) => {
        return courses.map((course: Course) => {
          return {
            ...course,
            id: course.id.toString(),
            date: new Date(course.date),
          };
        });
      }),
      tap((modifCourses) => (this.coursesList = modifCourses)),
      catchError(this.errorService.handleError)
    );
  }

  createCourse(course: Course): Observable<HttpResponse<Course>> {
    return this.http
      .post<Course>(COURSES_URL, course, { observe: 'response' })
      .pipe(catchError(this.errorService.handleError));
  }

  getItemById(id: string) {
    return this.coursesList.find((course) => course.id === id);
  }

  updateItem(course: Course, id: number): Observable<Course> {
    return this.http
      .patch<Course>(`${COURSES_URL}/${id}`, course)
      .pipe(catchError(this.errorService.handleError));
  }

  removeItem(id: string): Observable<HttpResponse<Course>> {
    console.log('remove', id);
    return this.http
      .delete<Course>(`${COURSES_URL}/${id}`, { observe: 'response' })
      .pipe(catchError(this.errorService.handleError));
  }
}
