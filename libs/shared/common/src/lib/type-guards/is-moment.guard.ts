import * as moment from 'moment';

export function isMoment(item: unknown): item is moment.Moment {
  return item !== null && moment.isMoment(item);
}
