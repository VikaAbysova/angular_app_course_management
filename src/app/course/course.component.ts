import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Course} from '../model/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnChanges, OnInit {

  @Input() course: Course;
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>()

  deleteCourse() {
    this.deleteId.emit(this.course.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
  }

  ngOnInit() {
    console.log('ngOnInit in course')
  }
}
