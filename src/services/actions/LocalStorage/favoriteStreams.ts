import type { IFavoriteStream, IStream, ITrendingVideo } from '@/types';

import { localStoragePassers } from './utils';
import { LOCALSTORAGE_KEYS } from '@/constants';

type SaveFavoriteStreamProps = {
  stream?: IStream;
  trending?: ITrendingVideo;
};

export function getFavoriteStreams(): IFavoriteStream[] {
  const value = localStorage.getItem(LOCALSTORAGE_KEYS.FAVORITE_STREAMS) || '[]';
  return JSON.parse(value) as IFavoriteStream[];
}

export function saveFavoriteStream({ stream, trending }: SaveFavoriteStreamProps): boolean {
  const passedData = localStoragePassers.dataToFavoriteStream({ stream, trending });
  const favoriteStreams = getFavoriteStreams();

  if (favoriteStreams.some((favorite) => favorite.thumbnail === passedData.thumbnail)) return false;
  localStorage.setItem(LOCALSTORAGE_KEYS.FAVORITE_STREAMS, JSON.stringify([...favoriteStreams, passedData]));
  return true;
}

export function toggleFavoriteStream({ stream, trending }: SaveFavoriteStreamProps): boolean {
  const passedData = localStoragePassers.dataToFavoriteStream({ stream, trending });

  if (isFavoriteStream({ stream, trending })) {
    removeFavoriteStream(passedData.id);
    return false;
  } else {
    saveFavoriteStream({ stream, trending });
    return true;
  }
}

export function isFavoriteStream({ stream, trending }: SaveFavoriteStreamProps): boolean {
  const passedData = localStoragePassers.dataToFavoriteStream({ stream, trending });
  const favoriteStreams = getFavoriteStreams();

  return favoriteStreams.some((favorite) => favorite.id === passedData.id);
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
