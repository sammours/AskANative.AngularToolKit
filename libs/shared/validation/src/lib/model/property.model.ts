import * as moment from 'moment';

export type PropertyLink<T> = (
  item: T
) => string | number | boolean | Date | moment.Moment | undefined;
