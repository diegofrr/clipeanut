'use server';

import trendingVideosData from '@/mocks/trendingVideosData';
import ITrendingVideo from '@/types/TrendingVideo';

const FAKE_REQUEST_DELAY = 1000;
const DEFAULT_REGION = 'BR';

interface ITrendingProps {
  region?: string;
}

interface _ITrendingProps {
  delay?: number;
}
export async function getTrendingVideos(
  props?: ITrendingProps
): Promise<ITrendingVideo[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/trending?region=${
      props?.region || DEFAULT_REGION
    }`
  )
    .then((res) => res.json())
    .then((data) => data as ITrendingVideo[]);
}

export async function _getTrendingVideos(
  props?: _ITrendingProps
): Promise<ITrendingVideo[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(trendingVideosData as ITrendingVideo[]);
      },
      props?.delay || FAKE_REQUEST_DELAY
    );
  });
}
