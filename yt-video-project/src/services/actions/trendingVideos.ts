'use server';

import trendingVideosData from '@/mocks/trendingVideosData';
import ITrendingVideo from '@/types/TrendingVideo';

import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';

interface ITrendingVideosProps {
  options: {
    endpoint: string;
    region?: string;
  };
}

interface IFakeTrendingVideosProps {
  delay?: number;
}

export async function getTrendingVideos({ options }: ITrendingVideosProps): Promise<ITrendingVideo[]> {
  return await fetch(`${options.endpoint}/trending?region=${options?.region || PIPED_VALUES.DEFAULT_REGION}`)
    .then((res) => res.json())
    .then((data) => data as ITrendingVideo[]);
}

export async function _getTrendingVideos(props: IFakeTrendingVideosProps): Promise<ITrendingVideo[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(trendingVideosData as ITrendingVideo[]);
      },
      props?.delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY
    );
  });
}
