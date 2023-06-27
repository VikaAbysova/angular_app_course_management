import { Course } from 'src/app/interfaces/course.interface';
import { createAction, props } from '@ngrx/store';
import { ECoursesActions } from './courses.types';

export const getCoursesList = createAction(
  ECoursesActions.COURSES_GET_LIST,
  props<{ params?: { [key: string]: string }}>()
);
export const getCoursesListSuccess = createAction(
  ECoursesActions.COURSES_GET_LIST_SUCCESS,
  props<{ coursesList: Course[] }>()
);
export const deleteCourseItem = createAction(
  ECoursesActions.COURSES_DELETE_ITEM,
  props<{ id: string }>()
);
