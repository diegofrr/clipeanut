'use server';

import type { IPipedInstance, ITrendingVideo } from '@/types';

import { trendingVideosData } from '@/mocks';
import { getCachedTrendingVideos, saveTrendingVideosInCache } from '../utils';
import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';

interface IFetchTrendingVideosProps {
  options: FetchTrendingVideosOptionsType;
}

export type FetchTrendingVideosOptionsType = {
  instance: IPipedInstance;
  region: string;
  isFake?: boolean;
  delay?: number;
};

export async function fetchTrendingVideos({ options }: IFetchTrendingVideosProps): Promise<ITrendingVideo[]> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchTrendingVideosOptionsType): Promise<ITrendingVideo[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const cachedData = await getCachedTrendingVideos(options.region);
  if (cachedData.length > 0) return cachedData;

  return await fetch(`${options.instance.api_url}/trending?region=${options?.region || PIPED_VALUES.DEFAULT_REGION}`, {
    cache: 'no-store',
    signal: controller.signal
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length) saveTrendingVideosInCache(options.region, data);
      return data as ITrendingVideo[];
    })
    .finally(() => clearTimeout(timeout));
}

async function fetchFakeData(delay?: number): Promise<ITrendingVideo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trendingVideosData as ITrendingVideo[]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
