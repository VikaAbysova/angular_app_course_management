import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ONE_DAY, TWO_WEEKS } from '../constants/timestamps.consts';

@Directive({
  selector: '[appFreshBorder]',
})
export class FreshBorderDirective implements OnChanges {
  @Input('appFreshBorder') creationDate: Date;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    const currentDate = new Date().getTime();
    const twoWeeksAgo = currentDate - TWO_WEEKS;
    const creationCourseDate = this.creationDate.getTime();
    const diff = currentDate - creationCourseDate;

    const actualCourseDate =
      diff < ONE_DAY && diff > 0 ? currentDate : creationCourseDate;
    const actualTwoWeekDate =
    twoWeeksAgo - creationCourseDate < ONE_DAY
        ? creationCourseDate
        : twoWeeksAgo;

    if (actualCourseDate < currentDate && actualCourseDate >= actualTwoWeekDate) {
      this.el.nativeElement.classList.add('green-border');
    } else if (actualCourseDate > currentDate) {
      this.el.nativeElement.classList.add('blue-border');
    }
  }
}
