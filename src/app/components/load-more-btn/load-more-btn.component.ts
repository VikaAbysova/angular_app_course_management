import { Course } from 'src/app/interfaces/course.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

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
    this.coursesService
      .getList()
      .subscribe((courses) => this.coursesEmit.emit(courses));
  }
}
