import { DataService } from './../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { Subscription, debounceTime, switchMap } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  load = true;
  subscribtion = new Subscription();

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private dataService: DataService,
    private spinnerService: SpinnerService
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

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  deleteCourse(id: string) {
    const result = prompt('Do you really want to delete this course?', 'yes');
    if (result === 'yes') {
      this.spinnerService.showLoading(true);
      this.coursesService
        .removeItem(id)
        .pipe(switchMap(() => this.coursesService.getList()))
        .subscribe((courses) => {
          (this.courses = courses), this.spinnerService.showLoading(false);
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
