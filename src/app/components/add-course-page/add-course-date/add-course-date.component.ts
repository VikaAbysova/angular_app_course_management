import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-course-date',
  templateUrl: './add-course-date.component.html',
  styleUrls: ['./add-course-date.component.scss'],
})
export class AddCourseDateComponent {
  dateValue: Date;
  @Output() date: EventEmitter<Date> = new EventEmitter<Date>();

  emitDate() {
    this.date.emit(new Date(this.dateValue));
  }
}
