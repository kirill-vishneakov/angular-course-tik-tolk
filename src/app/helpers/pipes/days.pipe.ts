import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'days',
  standalone: true,
})
export class DaysPipe implements PipeTransform {
  transform(value: string): string {
    const date = DateTime.fromISO(value).plus({ hour: 3 });
    const dateNow = DateTime.now();
    const yesterday = dateNow.minus({ days: 1 });

    if (date.hasSame(dateNow, 'day')) {
      return 'Сегодня';
    } else if (date.hasSame(yesterday, 'day')) {
      return 'Вчера';
    } else {
      return date.toLocaleString(DateTime.DATE_MED);
    }
  }
}
