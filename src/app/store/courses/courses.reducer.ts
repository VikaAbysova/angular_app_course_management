import { getCoursesListSuccess } from './courses.actions';
import { CoursesListState, initialCoursesListState } from './courses.state';
import { createReducer, on } from '@ngrx/store';

export const coursesReducer = createReducer(
  initialCoursesListState,
  on(getCoursesListSuccess, (state, { coursesList }): CoursesListState => ({
    ...state,
    coursesList: coursesList,
  }))
);
