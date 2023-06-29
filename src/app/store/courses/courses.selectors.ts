import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesListState } from './courses.state';

const featureKey = 'courses';

export const selectCourseListState = createFeatureSelector<CoursesListState>(featureKey);
export const selectCoursesList = createSelector(
  selectCourseListState,
  (state) => state.coursesList
);
