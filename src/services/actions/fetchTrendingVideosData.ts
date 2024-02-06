'use server';

import type { IPipedInstance, ITrendingVideo } from '@/types';
import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';
import { trendingVideosData } from '@/mocks';

interface IFetchTrendingVideosProps {
  options: FetchTrendingVideosOptionsType;
}

export type FetchTrendingVideosOptionsType = {
  instance: IPipedInstance;
  region?: string;
  isFake?: boolean;
  delay?: number;
};

export async function fetchTrendingVideos({ options }: IFetchTrendingVideosProps): Promise<ITrendingVideo[]> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchTrendingVideosOptionsType): Promise<ITrendingVideo[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  return await fetch(`${options.instance.api_url}/trending?region=${options?.region || PIPED_VALUES.DEFAULT_REGION}`, {
    cache: 'no-cache',
    signal: controller.signal
  })
    .then((res) => res.json())
    .then((data) => data as ITrendingVideo[])
    .finally(() => clearTimeout(timeout));
}

async function fetchFakeData(delay?: number): Promise<ITrendingVideo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trendingVideosData as ITrendingVideo[]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
