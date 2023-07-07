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
  string: string;

  constructor(
    private translate: TranslateService,
  ) {
    console.log(translate.currentLang);
  }

  transform(minutes: string): string {
    this.hour = Number.parseInt((+minutes / MINUTES_IN_HOUR).toString());
    this.minute = +minutes % MINUTES_IN_HOUR;
    const hh = `${this.hour}`;
    const mm = `${this.minute}`;

    this.hoursTransl = this.translate.instant('HOURS', { count: this.hour })[
      'few'
    ];
    this.minutesTransl = this.translate.instant('MINUTES', {
      count: this.minute,
    })['few'];

    this.string =
      +minutes < MINUTES_IN_HOUR
        ? `${minutes} ${this.minutesTransl}`
        : `${hh} ${this.hoursTransl} ${mm} ${this.minutesTransl}`;
    console.log('string in transform', this.string);

    return this.string;
  }
}
