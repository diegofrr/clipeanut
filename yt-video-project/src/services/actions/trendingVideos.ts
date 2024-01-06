'use server';

import trendingVideosData from '@/mocks/trendingVideosData';
import ITrendingVideo from '@/types/TrendingVideo';

import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';

interface ITrendingVideosProps {
  options: OptionsTrendingVideos;
}

export type OptionsTrendingVideos = {
  endpoint: string;
  region?: string;
  isFake?: boolean;
  delay?: number;
};

export async function getTrendingVideos({ options }: ITrendingVideosProps): Promise<ITrendingVideo[]> {
  return options.isFake ? _getTrendingVideosData(options.delay) : getTrendingVideosData(options);
}

export async function getTrendingVideosData(options: OptionsTrendingVideos): Promise<ITrendingVideo[]> {
  return await fetch(`${options.endpoint}/trending?region=${options?.region || PIPED_VALUES.DEFAULT_REGION}`)
    .then((res) => res.json())
    .then((data) => data as ITrendingVideo[]);
}

export async function _getTrendingVideosData(delay?: number): Promise<ITrendingVideo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trendingVideosData as ITrendingVideo[]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
