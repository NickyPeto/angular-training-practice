import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTimestampToDate',
  standalone: true,
})
export class UnixTimestampToDatePipe implements PipeTransform {
  transform(timestamp: number): string {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const dayIndex = date.getDay(); // Get the index of the day of the week (0 for Sunday, 1 for Monday, etc.)
    return daysOfWeek[dayIndex];
  }
}
