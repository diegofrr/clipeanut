export function translateUploadedDate(uploadedDate: string): string {
  return uploadedDate
    .replace('Streamed', 'Transmitido há')
    .replace('minute', 'minuto')
    .replace('hour', 'hora')
    .replace('day', 'dia')
    .replace('months', 'meses')
    .replace('month', 'mês')
    .replace('year', 'ano')
    .replace('ago', 'atrás');
}

export function channelImagemUrlGenerator(url: string) {
  const path = url.includes('/ytc/') ? '/ytc/' : '/';
  const _ = url.split('/').pop();

  const data = _?.split('?host=')[0];
  const host = _?.match(/(?:[?&])host=([^&]+)/)?.[1];

  return 'https://' + host + path + data;
}

export function formatStreamStats(num: number) {
  const numStr = String(num);

  if (num < 1e3) return num;

  if (num < 1e4) return numStr.slice(0, 1) + addDecimal(numStr, 'mil');
  if (num < 1e5) return numStr.slice(0, 2) + ' mil';
  if (num < 1e6) return numStr.slice(0, 3) + ' mil';

  if (num < 1e7) return numStr.slice(0, 1) + addDecimal(numStr, 'mi');
  if (num < 1e8) return numStr.slice(0, 2) + ' mi';
  if (num < 1e9) return numStr.slice(0, 3) + ' mi';

  if (num < 1e10) return numStr.slice(0, 1) + addDecimal(numStr, 'bi');
  if (num < 1e11) return numStr.slice(0, 2) + ' bi';
  if (num < 1e12) return numStr.slice(0, 3) + ' bi';

  function addDecimal(numStr: string, unit: string) {
    return `${numStr[1] !== '0' ? '.' + numStr[1] : ''} ${unit}`;
  }
}

export function formatStreamDuration(seconds: number) {
  return new Date(seconds * 1000).toISOString().substring(seconds < 3600 ? 14 : 11, 19);
}
