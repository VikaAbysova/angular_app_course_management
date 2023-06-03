import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appFreshBorder]',
})
export class FreshBorderDirective implements OnChanges {
  @Input('appFreshBorder') creationDate: Date;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    const oneDayMls = 1000 * 60 * 60 * 24;
    const foreteenDaysMls = oneDayMls * 14;
    const currentDMls = new Date().getTime();
    let creationDMls = this.creationDate.getTime();
    let twoWeekAgoMls = currentDMls - foreteenDaysMls;
    const diff = currentDMls - creationDMls;

    if (diff < oneDayMls && diff > 0) {
      creationDMls = currentDMls;
    }
    if (twoWeekAgoMls - creationDMls < oneDayMls) {
      twoWeekAgoMls = creationDMls;
    }
    if (creationDMls < currentDMls && creationDMls >= twoWeekAgoMls) {
      this.el.nativeElement.style.border = '3px solid green';
    } else if (creationDMls > currentDMls) {
      this.el.nativeElement.style.border = '3px solid blue';
    }
  }
}
