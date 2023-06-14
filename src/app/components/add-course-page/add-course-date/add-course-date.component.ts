import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-course-date',
  templateUrl: './add-course-date.component.html',
  styleUrls: ['./add-course-date.component.scss'],
})
export class AddCourseDateComponent {
  @Input() dateValue: string | Date | null;

  @Output() date: EventEmitter<Date> = new EventEmitter<Date>();

  emitDate() {
    this.date.emit(new Date(this.dateValue as Date));
  }
}
