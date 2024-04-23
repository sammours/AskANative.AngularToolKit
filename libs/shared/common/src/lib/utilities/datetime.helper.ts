import { Injectable } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelper {
  constructor() { }

  /**
    * format date
    * @param date the date
    * @returns formated date DD.MM.YYYY
    */
  getDate(date: Date): string {
    return moment(date).format('DD.MM.YYYY');
  }

  /**
    * format utc date
    * @param date the date
    * @returns formated utc date DD.MM.YYYY
    */
  getUtcDate(date: Date): string {
    return moment.utc(date).format('DD.MM.YYYY');
  }

  /**
    * format utc datetime
    * @param date the date
    * @returns formated utc datetime
    */
  getUtc(date: Date): string {
    return moment.utc(date).format();
  }

  /**
    * custom format date
    * @param date the date
    * @param format custom format
    * @returns formated date
    */
  format(date: Date, format: string): string {
    return moment(date).format(format);
  }
}
