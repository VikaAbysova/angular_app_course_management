import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from '../../interfaces/Course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {

  @Input() course: Course;
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>()

  deleteCourse() {
    this.deleteId.emit(this.course.id);
  }
}
