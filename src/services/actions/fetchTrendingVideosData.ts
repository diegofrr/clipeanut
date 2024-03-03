'use client';

import type { IPipedInstance, ITrendingVideo } from '@/types';

import { trendingVideosData } from '@/mocks';
import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';
import { getCachedTrendingVideos, saveCachedTrendingVideos } from './LocalStorage/cachedTrending';

interface IFetchTrendingVideosProps {
  options: FetchTrendingVideosOptionsType;
}

export type FetchTrendingVideosOptionsType = {
  instance: IPipedInstance;
  region: string;
  revalidate?: string;
  isFake?: boolean;
  delay?: number;
};

let controller: AbortController;

export async function fetchTrendingVideos({ options }: IFetchTrendingVideosProps): Promise<ITrendingVideo[]> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchTrendingVideosOptionsType): Promise<ITrendingVideo[]> {
  if (controller) controller.abort();
  controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), 2000);
  const cachedData = getCachedTrendingVideos(options.region);
  if (cachedData.length > 0) return cachedData;

  return await fetch(`${options.instance.api_url}/trending?region=${options?.region || PIPED_VALUES.DEFAULT_REGION}`, {
    cache: 'no-store',
    signal: controller.signal
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return Promise.reject(data.error);

      saveCachedTrendingVideos(options.region, data);
      return data as ITrendingVideo[];
    })
    .catch(() => [])
    .finally(() => clearTimeout(timeout));
}

async function fetchFakeData(delay?: number): Promise<ITrendingVideo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trendingVideosData as ITrendingVideo[]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
