import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';
import { MINUTES_IN_HOUR } from '../constants/minutes-in-hour.consts';

@Pipe({
  name: 'durationPipe',
})
export class DurationPipe implements PipeTransform {
  hour: number;
  minute: number;
  hoursTransl = '';
  minutesTransl = '';

  constructor(private translate: TranslateService) {}

  transform(minutes: string): string {
    this.hour = Number.parseInt((+minutes / MINUTES_IN_HOUR).toString());
    this.minute = +minutes % MINUTES_IN_HOUR;
    const hh = `${this.hour}`;
    const mm = `${this.minute}`;

    this.hoursTransl = this.translate.instant('HOURS.few', {
      count: this.hour,
    });
    this.minutesTransl = this.translate.instant('MINUTES.few', {
      count: this.minute,
    });

    return +minutes < MINUTES_IN_HOUR
      ? `${minutes} ${this.minutesTransl}`
      : `${hh} ${this.hoursTransl} ${mm} ${this.minutesTransl}`;
  }
}
