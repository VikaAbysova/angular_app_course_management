import { Pipe, PipeTransform } from '@angular/core';
import { MINUTES_IN_HOUR } from '../constants/minutes-in-hour.consts';

@Pipe({
  name: 'durationPipe',
})
export class DurationPipe implements PipeTransform {
  transform(minutes: string): string {
      const hour = Number.parseInt(
        (+minutes / MINUTES_IN_HOUR).toString()
      );
      const minute = +minutes % MINUTES_IN_HOUR;
      const hh = `${hour}`;
      const mm = `${minute}`;
      return +minutes < MINUTES_IN_HOUR ? `${minutes} min` : `${hh} h ${mm} min`;
    }
}
