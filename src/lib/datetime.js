import { format, formatISO } from 'date-fns';

/**
 * formatDate
 */

export function formatDate(date, pattern = 'PPP') {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return format(date, pattern);
}

/**
 * formatDateToIso
 */

export function formatDateToIso(date, format = 'basic', representation = 'complete') {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return formatISO(date, { format, representation });
}

/**
 * sortObjectsByDate
 */

export function sortObjectsByDate(array, { key = 'date' } = {}) {
  return array.sort((a, b) => new Date(b[key]) - new Date(a[key]));
}

/**
 * setDatetimeTimezone
 * @via https://stackoverflow.com/a/53652131
 */

export function setDatetimeTimezone(date, ianatz) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const invdate = new Date(
    date.toLocaleString('en-US', {
      timeZone: ianatz,
    })
  );

  const diff = date.getTime() - invdate.getTime();

  return new Date(date.getTime() - diff);
}

/**
 * offsetDatetimeToTimezone
 */

export function offsetDatetimeToTimezone(date, ianatz) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return new Date(
    date.toLocaleString('en-US', {
      timeZone: ianatz,
    })
  );
}

/**
 * dateIsPast
 */

export function dateIsPast(date, offset = 0) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date < new Date(new Date().getTime() + offset);
}

/**
 * dateIsFuture
 */

export function dateIsFuture(date, offset = 0) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date > new Date(new Date().getTime() + offset);
}
