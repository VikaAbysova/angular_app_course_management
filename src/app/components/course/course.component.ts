import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  constructor(private durationPipe: DurationPipe) {}

  @Input() course: Course;
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>();

  emitDeleteId() {
    this.deleteId.emit(this.course.id);
  }

  ngOnInit(): void {
    this.course.durationMin  = this.durationPipe.transform(
      this.course.durationMin
    );
  }
}
