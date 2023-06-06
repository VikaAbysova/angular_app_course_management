import { coursesList } from '../mocks/courses.mock';
import { FilterCoursesPipe } from './filter-courses.pipe';

describe('FilterCoursesPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterCoursesPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter courses', () => {
    const pipe = new FilterCoursesPipe();
    const inputValue = 'Course 3';
    const filteredCourse = pipe.transform(
      inputValue.toLowerCase(),
      coursesList
    );
    expect(filteredCourse[0].title).toEqual(inputValue);
  });
});
