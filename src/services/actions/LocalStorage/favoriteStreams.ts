import { localStoragePassers } from './utils/Passers';

import type { IFavoriteStream, IStream, ITrendingVideo } from '@/types';
import { LOCALSTORAGE_KEYS } from '@/constants';

export function getFavoriteStreams(): IFavoriteStream[] {
  const value = localStorage.getItem(LOCALSTORAGE_KEYS.FAVORITE_STREAMS) || '[]';
  return JSON.parse(value) as IFavoriteStream[];
}

export function setFavoriteStreamsWithStreamInput(newData: IStream) {
  const passedData = localStoragePassers.streamDataToFavoriteStream(newData);
  const favoriteStreams = getFavoriteStreams();

  passedData.id = String(favoriteStreams.length + 1);

  localStorage.setItem(LOCALSTORAGE_KEYS.FAVORITE_STREAMS, JSON.stringify([...favoriteStreams, newData]));
}

export function setFavoriteStreamsWithTrendingInput(newData: ITrendingVideo) {
  const passedData = localStoragePassers.trendingVideoToFavoriteStream(newData);
  const favoriteStreams = getFavoriteStreams();

  passedData.id = String(favoriteStreams.length + 1);

  localStorage.setItem(LOCALSTORAGE_KEYS.FAVORITE_STREAMS, JSON.stringify([...favoriteStreams, newData]));
}

export function removeFavoriteStream(id: string) {
  const favoriteStreams = getFavoriteStreams();
  localStorage.setItem(
    LOCALSTORAGE_KEYS.FAVORITE_STREAMS,
    JSON.stringify(favoriteStreams.filter((item) => item.id !== id))
  );
}

export function clearFavoriteStreams() {
  localStorage.removeItem(LOCALSTORAGE_KEYS.FAVORITE_STREAMS);
}
