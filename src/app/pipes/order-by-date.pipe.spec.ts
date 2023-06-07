import { coursesList } from '../mocks/courses.mock';
import { OrderByDatePipe } from './order-by-date.pipe';

describe('OrderByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should display courses in correct order by creation date', () => {
    const courses = coursesList;
    const byOrderPipe = new OrderByDatePipe();
    const transformOrder = byOrderPipe.transform(courses);
    expect(transformOrder[0].creationDate).toEqual(new Date(2023, 5, 7));
    expect(transformOrder[3].creationDate).toEqual(new Date(2023, 3, 1));
  });
});
