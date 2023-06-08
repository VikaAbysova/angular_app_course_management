import { Injectable } from '@angular/core';
import { coursesList } from '../mocks/courses.mock';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  coursesList: Course[] = coursesList;

  getList(): Course[] {
    return this.coursesList;
  }

  createCourse(course: Course): void {
    this.coursesList.push(course);
  }

  getItemById(id: string) {
    return this.coursesList.find((course) => course.id === id);
  }

  updateItem(id: string) {
    return this.getItemById(id);
  }

  removeItem(id: string): void {
    this.coursesList = this.coursesList.filter((course) => course.id !== id);
  }
}
