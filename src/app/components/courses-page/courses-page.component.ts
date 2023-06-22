import { DataService } from './../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { Subscription, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  load = true;
  subscribtion: Subscription;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const start = '0';
    const count = '2';
    let params = new HttpParams();

    this.subscribtion = this.dataService.searchData$
      .pipe(
        debounceTime(700),
        switchMap((data) => {
          let params = new HttpParams();
          this.load = true;
          if (data.length >= 3) {
            params = params.append('textFragment', data);
          }
          return this.coursesService.getList(params);
        })
      )
      .subscribe((gotCourses: Course[]) => {
        this.courses = gotCourses;
      });

    params = start ? params.append('start', start) : params;
    params = count ? params.append('count', count) : params;
    this.coursesService.getList(params).subscribe((gotCourses: Course[]) => {
      this.courses = gotCourses;
    });
  }

  deleteCourse(id: string) {
    const result = prompt('Do you really want to delete this course?', 'yes');
    if (result === 'yes') {
      this.coursesService
        .removeItem(id)
        .pipe(switchMap(() => this.coursesService.getList()))
        .subscribe((courses) => (this.courses = courses));
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
