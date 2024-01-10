export function channelImagemUrlGenerator(url: string) {
  const path = url.includes('/ytc/') ? '/ytc/' : '/';
  const _ = url.split('/').pop();
  const data = _?.split('?host=')[0];
  const host = _?.match(/(?:[?&])host=([^&]+)/)?.[1];
  return 'https://' + host + path + data;
}
