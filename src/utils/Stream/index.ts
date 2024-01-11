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

export function formatStreamStats(count: number) {
  if (count >= 1e9) return (count / 1e9).toFixed(1).replace(/\.0$/, '') + 'bi';
  else if (count >= 1e6) return (Math.floor(count / 1e5) / 10).toFixed(1).replace(/\.0$/, '') + 'mi';
  else if (count >= 1e3) return (Math.floor(count / 1e2) / 10).toFixed(1).replace(/\.0$/, '') + 'mil';
  else return count?.toString();
}

export function formatStreamViews(count: number) {
  return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}
