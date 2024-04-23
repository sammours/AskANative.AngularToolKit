import * as moment from 'moment';

export function isDate(item: unknown): item is Date {
  return item !== null && moment.isDate(item);
}
