import { Pipe, PipeTransform, signal } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateAgo',
  standalone: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: string): string {
    const date = DateTime.fromISO(value).plus({ hour: 3 });
    const dateNow = DateTime.now();

    const diff = dateNow
      .diff(date, ['years', 'months', 'days', 'hours', 'minutes', 'seconds'])
      .toObject();

    if (diff.years && diff.years > 0) {
      return `${Math.floor(diff.years)} ${this.pluralize(
        Math.floor(diff.years),
        'год',
        'года',
        'лет'
      )} назад`;
    } else if (diff.months && diff.months > 0) {
      return `${Math.floor(diff.months)} ${this.pluralize(
        Math.floor(diff.months),
        'месяц',
        'месяца',
        'месяцев'
      )} назад`;
    } else if (diff.days && diff.days > 0) {
      return `${Math.floor(diff.days)} ${this.pluralize(
        Math.floor(diff.days),
        'день',
        'дня',
        'дней'
      )} назад`;
    } else if (diff.hours && diff.hours > 0) {
      return `${Math.floor(diff.hours)} ${this.pluralize(
        Math.floor(diff.hours),
        'час',
        'часа',
        'часов'
      )} назад`;
    } else if (diff.minutes && diff.minutes > 0) {
      return `${Math.floor(diff.minutes)} ${this.pluralize(
        Math.floor(diff.minutes),
        'минута',
        'минуты',
        'минут'
      )} назад`;
    } else {
      return `только что`;
    }
  }

  pluralize(num: number, one: string, two: string, five: string): string {
    if (num % 10 === 1 && num % 100 !== 11) {
      return one;
    } else if (
      num % 10 >= 2 &&
      num % 10 <= 4 &&
      (num % 100 < 10 || num % 100 >= 20)
    ) {
      return two;
    } else {
      return five;
    }
  }
}
