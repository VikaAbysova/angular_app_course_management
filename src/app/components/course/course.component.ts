import { SpinnerService } from 'src/app/services/spinner.service';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnChanges, OnInit {
  @Input() course: Course;
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>();

  transformedDuration: string;
  constructor(
    private durationPipe: DurationPipe,
    private spinnerService: SpinnerService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.callDurationPipe();
    });
  }

  ngOnChanges(): void {
    this.callDurationPipe();
  }
  
  emitDeleteId() {
    this.deleteId.emit(this.course.id as string);
    this.spinnerService.showLoading(true);
  }

  callDurationPipe() {
    this.transformedDuration = this.durationPipe.transform(
      this.course.durationMin ? this.course.durationMin : '0'
    );
  }
}
