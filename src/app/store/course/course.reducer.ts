import { getCourseItemSuccess, editCourseItemSuccess, addCourseSuccess } from './course.actions';
import { createReducer, on } from '@ngrx/store';
import { CourseState, initialCourseState } from './course.state';

export const courseReducer = createReducer(
  initialCourseState,
  on(getCourseItemSuccess, (state, { course }): CourseState => ({
    ...state,
    course
  })),
  on(editCourseItemSuccess, (state, { course }): CourseState => ({
    ...state,
    course,
  })),
  on(addCourseSuccess, (state, { course }): CourseState => ({
    ...state,
    course,
  })),
);
