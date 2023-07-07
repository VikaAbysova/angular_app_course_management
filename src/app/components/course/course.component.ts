import { SpinnerService } from 'src/app/services/spinner.service';
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

  transformedDuration: string;
  constructor(
    private durationPipe: DurationPipe,
    private spinnerService: SpinnerService,
  ) {}

  emitDeleteId() {
    this.deleteId.emit(this.course.id as string);
    this.spinnerService.showLoading(true);
  }

  ngOnChanges(): void {
    this.transformedDuration = this.durationPipe.transform(
      this.course.durationMin ? this.course.durationMin : '0'
    );
  }
}
