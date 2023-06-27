import {
  deleteCourseItem,
  getCoursesList,
  getCoursesListSuccess,
} from './courses.actions';
import { Course } from 'src/app/interfaces/course.interface';
import { CoursesService } from 'src/app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesEffects {

  coursesList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCoursesList),
      exhaustMap(({ params }) =>
        this.coursesService.getList(params).pipe(
          map((coursesList: Course[]) =>
            getCoursesListSuccess({ coursesList })
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  deleteCourse$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteCourseItem),
        exhaustMap(({ id }) =>
          this.coursesService.removeItem(id).pipe(
            map(() => getCoursesList({})),
            catchError(() => EMPTY)
          )
        )
      );
    }
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
