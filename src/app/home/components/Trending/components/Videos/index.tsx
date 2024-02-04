'use client';

import { Reducer, useCallback, useContext, useEffect, useReducer } from 'react';

import { TrendingVideo } from './components/Video';

import type { ITrendingVideo } from '@/types';
import { ActionTypes, type TrendingVideosAction, type TrendingVideosState } from './reducer/types';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { HighlighStreamContext } from '@/app/home/contexts/highlightStream';
import { initialTrendingVideosState, trendingVideoReducer } from './reducer';
import { useWindowSize } from 'usehooks-ts';

import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';
import { isFakeDataFetch } from '@/environments';

import { PIPED_VALUES } from '@/constants';
import TrendingVideosSkeleton from '../Skeletons/TrendingVideosSkeleton';
const { DEFAULT_INSTANCE_LIST } = PIPED_VALUES;

type TrendingVideosProps = {
  isHidden?: boolean;
};

export default function TrendingVideos({ isHidden }: TrendingVideosProps) {
  const { region } = useContext(PipedInstanceContext);
  const { setHighlightStream } = useContext(HighlighStreamContext);
  const { width } = useWindowSize();

  const [state, dispatch] = useReducer<Reducer<TrendingVideosState, TrendingVideosAction>>(
    trendingVideoReducer,
    initialTrendingVideosState
  );

  const setIsLoading = (data: boolean) => dispatch({ type: ActionTypes.SET_IS_LOADING, payload: data });
  const setTrendingVideos = useCallback(
    (data: ITrendingVideo[]) => {
      setHighlightStream(data[0]);
      dispatch({ type: ActionTypes.SET_TRENDING_VIDEOS, payload: data });
    },
    [setHighlightStream]
  );

  let oldInstanceList = DEFAULT_INSTANCE_LIST;

  const retryLoadTrendingVideo = useCallback(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!oldInstanceList?.length) oldInstanceList = DEFAULT_INSTANCE_LIST;
    oldInstanceList = oldInstanceList.slice(1);

    loadTrendingVideos();
  }, []);

  const loadTrendingVideos = useCallback(async () => {
    setIsLoading(true);

    const instance = oldInstanceList[0];

    const options = { instance, region, delay: 1, isFake: isFakeDataFetch } as FetchTrendingVideosOptionsType;

    try {
      const data = await fetchTrendingVideos({ options });
      setTrendingVideos(data);
    } catch {
      retryLoadTrendingVideo();
    } finally {
      setIsLoading(false);
    }
  }, [oldInstanceList, setTrendingVideos, region, retryLoadTrendingVideo]);

  useEffect(() => {
    if (window?.document) loadTrendingVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  return (
    <div
      className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6 justify-items-center
      ${isHidden ? 'hidden' : ''}`}
    >
      {state.isLoading ? (
        <TrendingVideosSkeleton />
      ) : (
        <>
          {state.trendingVideos.map((video, index) => (
            <TrendingVideo className={`${index === 0 && width >= 640 ? 'hidden' : ''}`} key={index} data={video} />
          ))}
        </>
      )}
    </div>
  );
}
