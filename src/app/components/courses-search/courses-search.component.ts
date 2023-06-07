import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent {
  searchCourse = '';

  @Output() courseTitle: EventEmitter<string> = new EventEmitter<string>();

  searchClick() {
    this.courseTitle.emit(this.searchCourse);
    console.log(this.searchCourse);
  }
}
