import { Course } from 'src/app/interfaces/course.interface';

export interface CourseState {
  course: Course;
}

export const initialCourseState: CourseState = {
  course: {
    id: 0,
    name: '',
    description: '',
    isTopRated: false,
    date: '',
    durationMin: '',
    length: 0,
    authors: [],
  },
};
