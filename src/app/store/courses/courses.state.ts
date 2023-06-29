import { Course } from 'src/app/interfaces/course.interface';

export interface CoursesListState {
  coursesList: Course[];
}

export const initialCoursesListState: CoursesListState = {
  coursesList: [],
};
