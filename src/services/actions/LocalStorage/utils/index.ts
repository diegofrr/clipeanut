import * as LocalStoragePassers from './Passers';

export function isSameDay(date1: Date, date2 = new Date()) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function extractId(link: string): string {
  const url = new URL(link);
  return url.pathname.split('/').reverse()[1];
}

export { LocalStoragePassers };
