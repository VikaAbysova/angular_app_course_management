import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnChanges {
  @Input() course: Course;
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>();
  constructor(private durationPipe: DurationPipe) {}

  emitDeleteId() {
    this.deleteId.emit(this.course.id);
  }

  ngOnChanges(): void {
    this.course.durationMin = this.durationPipe.transform(
      this.course.durationMin
    );
  }
}
