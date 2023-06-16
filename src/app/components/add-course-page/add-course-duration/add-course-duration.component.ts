import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-course-duration',
  templateUrl: './add-course-duration.component.html',
  styleUrls: ['./add-course-duration.component.scss'],
})
export class AddCourseDurationComponent {
  @Input() durationValue: number;

  @Output() duration: EventEmitter<number> = new EventEmitter<number>();

  emitDuration() {
    this.duration.emit(this.durationValue as number);
  }
}
