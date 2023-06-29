import { getCoursesList } from './../courses/courses.actions';
import { Injectable } from '@angular/core';
import {
  getCourseItem,
  getCourseItemSuccess,
  addCourseSuccess,
  addCourse,
  editCourseItem,
  editCourseItemSuccess,
} from './course.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from 'src/app/services/courses.service';
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { Course } from 'src/app/interfaces/course.interface';

@Injectable()
export class CourseEffects {
  getCourseItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCourseItem),
      exhaustMap(({ id }) =>
        this.coursesService.getItemById(id).pipe(
          map((course: Course) => getCourseItemSuccess({ course })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  addCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addCourse),
      exhaustMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          switchMap((course: Course) =>
            of(addCourseSuccess({ course }), getCoursesList({}))
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  editCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editCourseItem),
      exhaustMap(({ course, id }) =>
        this.coursesService.updateItem(course, id).pipe(
          map((course: Course) => editCourseItemSuccess({ course })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
