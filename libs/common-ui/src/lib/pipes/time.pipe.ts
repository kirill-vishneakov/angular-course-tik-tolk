import { DateTime } from 'luxon';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    const date = DateTime.fromISO(value).plus({ hour: 3 });
    if (date.minute.toString().length === 1)
      return `${date.hour}:0${date.minute}`;
    return `${date.hour}:${date.minute}`;
  }
}
