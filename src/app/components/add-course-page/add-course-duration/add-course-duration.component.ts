import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-course-duration',
  templateUrl: './add-course-duration.component.html',
  styleUrls: ['./add-course-duration.component.scss'],
})
export class AddCourseDurationComponent {
  durationValue = 0;
  @Output() duration: EventEmitter<number> = new EventEmitter<number>();

  emitDuration() {
    this.duration.emit(this.durationValue);
  }
}
