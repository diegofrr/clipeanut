import trendingVideosData from '@/mocks/trendingVideosData';
import ITrendingVideo from '@/types/TrendingVideo';

const FAKE_REQUEST_DELAY = 1000;

interface ITrendingProps {
  region?: string;
}

export async function getTrendingVideos(
  props?: ITrendingProps
): Promise<ITrendingVideo[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/trending?region=${
      props?.region || 'BR'
    }`
  )
    .then((res) => res.json())
    .then((data) => data as ITrendingVideo[]);
}

export async function _getTrendingVideos(
  props?: ITrendingProps
): Promise<ITrendingVideo[]> {
  props;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trendingVideosData as ITrendingVideo[]);
    }, FAKE_REQUEST_DELAY);
  });
}
