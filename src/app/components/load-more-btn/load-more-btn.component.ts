import { SpinnerService } from 'src/app/services/spinner.service';
import { getCoursesList } from './../../store/courses/courses.actions';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.scss'],
})
export class LoadMoreBtnComponent {
  constructor(
    private store: Store,
    private spinnerService: SpinnerService
  ) {}
  @Output() callEmit: EventEmitter<null> = new EventEmitter<null>();

  loadMore(e: Event) {
    e.preventDefault();
    this.store.dispatch(getCoursesList({}));
    this.callEmit.emit();
    this.spinnerService.showLoading(true)
  }
}
