'use client';

import { useContext, useEffect, useState } from 'react';

import CustomSpinner from '@/components/CustomSpinner';
import { TrendingVideo } from './components/Video';

import { ITrendingVideo } from '@/types';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { HighlighStreamContext } from '@/app/home/contexts/highlightStream';
import { useWindowSize } from 'usehooks-ts';

import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';
import { isFakeDataFetch } from '@/environments';

import { HOME_PAGE_VALUES } from '@/constants';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

type TrendingVideosProps = {
  isHidden?: boolean;
};

export default function TrendingVideos({ isHidden }: TrendingVideosProps) {
  const { region, instance } = useContext(PipedInstanceContext);
  const { setHighlightStream } = useContext(HighlighStreamContext);

  const { width } = useWindowSize();
  const [isLoading, setIsLoading] = useState<boolean>(INITIAL_STATE.LOADING);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>(INITIAL_STATE.TRENDING_VIDEOS);

  async function loadTrendingVideos() {
    setIsLoading(true);
    const options = { instance, region, delay: 1, isFake: isFakeDataFetch } as FetchTrendingVideosOptionsType;

    try {
      const data = await fetchTrendingVideos({ options });
      setTrendingVideos(data);
      setHighlightStream(data[0]);
      setIsLoading(false);
      console.log(data);
    } catch {
      /* empty */
    }
  }

  useEffect(() => {
    if (window?.document) loadTrendingVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6 justify-items-center
      ${isHidden ? 'hidden' : ''}`}
    >
      {isLoading && <CustomSpinner stroke="md" className="absolute" />}
      {!isLoading && trendingVideos.length > 0 && (
        <>
          {trendingVideos.map((video, index) => (
            <TrendingVideo className={`${index === 0 && width >= 640 ? 'hidden' : ''}`} key={index} data={video} />
          ))}
        </>
      )}
    </div>
  );
}
