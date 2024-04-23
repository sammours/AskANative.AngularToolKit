/**
 * This is a custom stringify-function to be used within the JSON.stringify()-function
 * currently used within the rest-client-service when sending data to our server.
 */

export function deepCopy<T extends Object>(obj: T): T {
   return JSON.parse(JSON.stringify(obj, stringify));
}

function stringify(key: string | {}, value: string) {
   if (typeof value === 'string' && isoStringRegEx.test(value)) {
      const date = new Date(value);
      if (isDateWithoutLocalTime(date)) {
         return removeTimeZoneOffsetFromDate(date)
            .toISOString()
            .replace('Z', '');
      }
   }
   return value;
}

function removeTimeZoneOffsetFromDate(date: Date): Date {
   const dateWithoutTimeZone = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
   return dateWithoutTimeZone;
}

function isDateWithoutLocalTime(date: Date) {
   return date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0 && date.getUTCMilliseconds() === 0;
}

const isoStringRegEx = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
