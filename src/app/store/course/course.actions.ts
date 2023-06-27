import { Course } from 'src/app/interfaces/course.interface';
import { createAction, props } from '@ngrx/store';
import { ECourseActions } from './course.types';

export const getCourseItem = createAction(
  ECourseActions.COURSE_GET_ITEM,
  props<{ id: string }>()
);
export const getCourseItemSuccess = createAction(
  ECourseActions.COURSE_GET_ITEM_SUCCESS,
  props<{ course: Course }>()
);
export const editCourseItem = createAction(
  ECourseActions.COURSE_EDIT_ITEM,
  props<{ course: Course, id: number }>()
);
export const editCourseItemSuccess = createAction(
  ECourseActions.COURSE_GET_ITEM_SUCCESS,
  props<{ course: Course }>()
);
export const addCourse = createAction(
  ECourseActions.COURSE_ADD_ITEM,
  props<{ course: Course }>()
);
export const addCourseSuccess = createAction(
  ECourseActions.COURSE_ADD_ITEM_SUCCESS,
  props<{ course: Course }>()
);
