import { validationPatterns } from './pattern';

export function getNumberValueFromTimeString(time: string) {
  if (validationPatterns.timePattern.test(time)) {
    return parseInt(time.replace(':', ''), 10);
  }
  return undefined;
}
