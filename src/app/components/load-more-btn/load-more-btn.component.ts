import { Course } from 'src/app/interfaces/course.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.scss'],
})
export class LoadMoreBtnComponent {
  constructor(private coursesService: CoursesService) {}
  @Output() coursesEmit: EventEmitter<Course[]> = new EventEmitter<Course[]>();

  loadMore(e: Event) {
    e.preventDefault();
    let params = new HttpParams();
    params = params.append('sort', 'date')
    this.coursesService
      .getList(params)
      .subscribe((courses) => this.coursesEmit.emit(courses));
  }
}
