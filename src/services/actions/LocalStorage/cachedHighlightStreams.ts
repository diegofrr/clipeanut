'use client';

import type { IStream } from '@/types';

import { LOCALSTORAGE_KEYS } from '@/constants';
import { ICachedHighligthStream } from './types';
import { localStoragePassers } from './utils';

export function getCachedHighligthtStream(id: string): ICachedHighligthStream {
  try {
    const storagedData = localStorage.getItem(LOCALSTORAGE_KEYS.CACHED_HIGHLIGHT_VIDEOS) || '[]';
    const cachedStreamList = JSON.parse(storagedData) as ICachedHighligthStream[];
    const cachedStream = cachedStreamList.find((item) => item.id === id) || ({} as ICachedHighligthStream);

    return cachedStream;
  } catch {
    return {} as ICachedHighligthStream;
  }
}

export function saveCachedHighlightStream(data: IStream) {
  try {
    const passedData = localStoragePassers.streamToCachedHighligthStream(data);
    const storagedData = localStorage.getItem(LOCALSTORAGE_KEYS.CACHED_HIGHLIGHT_VIDEOS) || '[]';
    let cachedStreamList = JSON.parse(storagedData) as ICachedHighligthStream[];

    if (!cachedStreamList || !cachedStreamList.length) cachedStreamList = [passedData];
    else cachedStreamList.push(passedData);

    const newData: ICachedHighligthStream[] = cachedStreamList;
    localStorage.setItem(LOCALSTORAGE_KEYS.CACHED_HIGHLIGHT_VIDEOS, JSON.stringify(newData));
  } catch {
    /*empty*/
  }
}

// function resetCachedHighlightStreams() {
//   localStorage.removeItem(LOCALSTORAGE_KEYS.CACHED_HIGHLIGHT_VIDEOS);
// }
