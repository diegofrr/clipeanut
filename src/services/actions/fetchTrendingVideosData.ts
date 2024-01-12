'use server';

import trendingVideosData from '@/mocks/trendingVideosData';

import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';
import type { IPipedInstance, ITrendingVideo } from '@/types';

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
  return await fetch(`${options.instance.api_url}/trending?region=${options?.region || PIPED_VALUES.DEFAULT_REGION}`)
    .then((res) => res.json())
    .then((data) => data as ITrendingVideo[]);
}

async function fetchFakeData(delay?: number): Promise<ITrendingVideo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trendingVideosData as ITrendingVideo[]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
