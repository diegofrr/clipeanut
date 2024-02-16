'use client';

import type { ITrendingVideo } from '@/types';

import { LOCALSTORAGE_KEYS } from '@/constants';
import { ICachedTrendingVideos } from './types';
import { isSameDay } from './utils';

export function getCachedTrendingVideos(region: string): ITrendingVideo[] {
  try {
    const storagedData = localStorage.getItem(LOCALSTORAGE_KEYS.CACHED_TRENDING_VIDEOS) || '[]';
    const { regionList, lastUpdate } = JSON.parse(storagedData) as ICachedTrendingVideos;
    const cachedRegion = regionList.find((item) => item.region === region);

    if (isSameDay(new Date(lastUpdate))) return cachedRegion?.data ? cachedRegion.data : [];
    else {
      resetCachedTrendingVideos();
      return [];
    }
  } catch {
    return [];
  }
}

export function saveCachedTrendingVideos(region: string, data: ITrendingVideo[]) {
  try {
    const storagedData = localStorage.getItem(LOCALSTORAGE_KEYS.CACHED_TRENDING_VIDEOS) || '[]';
    let { regionList } = JSON.parse(storagedData) as ICachedTrendingVideos;
    if (!regionList || !regionList.length) regionList = [{ region, data }];
    else regionList.push({ region, data });

    const newData: ICachedTrendingVideos = { lastUpdate: new Date().toISOString(), regionList };
    localStorage.setItem(LOCALSTORAGE_KEYS.CACHED_TRENDING_VIDEOS, JSON.stringify(newData));
  } catch {
    /*empty*/
  }
}

function resetCachedTrendingVideos() {
  localStorage.removeItem(LOCALSTORAGE_KEYS.CACHED_TRENDING_VIDEOS);
}
