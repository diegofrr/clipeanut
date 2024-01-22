'use client';

import { useContext, useEffect, useState } from 'react';

import CustomSpinner from '@/components/CustomSpinner';
import { TrendingVideo } from './components/Video';

import { ITrendingVideo } from '@/types';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { HOME_PAGE_VALUES } from '@/constants';
import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';
import { isFakeDataFetch } from '@/environments';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

type TrendingVideosProps = {
  isHidden?: boolean;
};

export default function TrendingVideos({ isHidden }: TrendingVideosProps) {
  const { region, instance } = useContext(PipedInstanceContext);

  const [isLoading, setIsLoading] = useState<boolean>(INITIAL_STATE.LOADING);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>(INITIAL_STATE.TRENDING_VIDEOS);

  async function loadTrendingVideos() {
    setIsLoading(true);
    const options = { instance, region, delay: 1, isFake: isFakeDataFetch } as FetchTrendingVideosOptionsType;

    try {
      const data = await fetchTrendingVideos({ options });
      setTrendingVideos(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (window?.document) loadTrendingVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`grid w-full grid-cols-1 sm:grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-y-10 gap-x-6 justify-items-center
      ${isHidden ? 'hidden' : ''}`}
    >
      {isLoading && <CustomSpinner stroke="md" className="absolute" />}
      {!isLoading && trendingVideos.length > 0 && (
        <>
          {trendingVideos.map((video, index) => (
            <TrendingVideo key={index} data={video} />
          ))}
        </>
      )}
    </div>
  );
}
