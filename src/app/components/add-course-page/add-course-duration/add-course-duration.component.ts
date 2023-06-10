import { Component } from '@angular/core';

@Component({
  selector: 'app-add-course-duration',
  templateUrl: './add-course-duration.component.html',
  styleUrls: ['./add-course-duration.component.scss'],
})
export class AddCourseDurationComponent {
  durationValue: number | string = 0;
}
