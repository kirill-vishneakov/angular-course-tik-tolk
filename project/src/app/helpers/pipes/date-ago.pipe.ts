import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  standalone: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const date_now = new Date().toLocaleDateString().split('.');
    const time_now = new Date().toLocaleTimeString().split(':');

    const date_time = value.split('T');
    const date = date_time[0].split('-');
    const time = date_time[1].split(':');

    console.log(
      'Дата:',
      date,
      'Время:',
      time,
      'Дата сейчас:',
      date_now,
      'Минуты сейчас',
      time_now
    );

    if (date_now[2] !== date[0]) return 'Несколько лет назад';
    if (date_now[1] !== date[1]) return 'Несколько месяцев назад';
    if (date_now[0] !== date[2]) return 'Несколько дней назад';
    if (time_now[0] !== time[0]) return 'Несколько часов назад';
    if (time_now[1] !== time[1]) return 'Несколько минут назад';
    return 'Несколько секунд назад';
  }
}
