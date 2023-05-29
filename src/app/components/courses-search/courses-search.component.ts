import { Component } from '@angular/core';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent {
  searchCourse = '';

  searchClick() {
    console.log(this.searchCourse);
  }
}
