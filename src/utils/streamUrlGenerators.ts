export function thumbnailGenerator(url: string) {
  return `https://i.ytimg.com/vi/${url.split('v=')[1]}/mqdefault.jpg`;
}

export function channelImage(url: string) {
  const _ = url.split('/').pop();
  const data = _?.split('?host=')[0];
  const host = _?.match(/(?:[?&])host=([^&]+)/)?.[1];
  const ytc = url?.includes('/ytc/') ? '/ytc/' : '/';
  return 'https://' + host + ytc + data;
}
