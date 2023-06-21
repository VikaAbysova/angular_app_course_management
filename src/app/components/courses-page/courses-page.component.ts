import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  load = true;

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    const start = '0';
    const count = '2';
    let params = new HttpParams();
    params = start ? params.append('start', start) : params;
    params = count ? params.append('count', count) : params;
    params = params.append('sort', 'date');
    this.coursesService.getList(params).subscribe((gotCourses: Course[]) => {
      this.courses = gotCourses;
    });
  }

  applyFilter(courseTitle: string): void {
    let params = new HttpParams();
    params = courseTitle
      ? params.append('textFragment', courseTitle)
      : params.append('sort', 'date');
    this.coursesService.getList(params).subscribe((course) => {
      this.courses = course;
    });
  }

  deleteCourse(id: string) {
    const result = prompt('Do you really want to delete this course?', 'yes');
    if (result === 'yes') {
      let params = new HttpParams();
      params = params.append('sort', 'date');
      this.coursesService.removeItem(id).subscribe(() => {
        this.coursesService
          .getList(params)
          .subscribe((courses) => (this.courses = courses));
      });
    }
    console.log('delete id', id);
  }

  loadCourses(coursesList: Course[]) {
    this.courses = coursesList;
    this.load = false;
  }

  addCourse() {
    this.router.navigate(['/courses/new']);
  }

  trackById(index: number, course: Course): string {
    return course.id as string;
  }
}
