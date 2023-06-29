import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.state';

export const courseItemfeatureKey = 'course';

export const selectCourseState = createFeatureSelector<CourseState>(courseItemfeatureKey);
export const selectCourse = createSelector(
  selectCourseState,
  (state) => state.course
);
