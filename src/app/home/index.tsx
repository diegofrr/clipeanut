'use client';

import { useContext, useEffect, useState } from 'react';

import Aside from './components/Aside/components';
import TrendingVideos from './components/TrendingVideos';

import type { ITrendingVideo } from '@/types';
import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';

import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { isFakeDataFetch } from '@/environments';
import { IconFlame } from '@tabler/icons-react';
import { Header } from '@/components/Header';
import { HOME_PAGE_VALUES } from '@/constants';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

export default function Home() {
  const { region, instance } = useContext(PipedInstanceContext);

  const [isLoading, setIsLoading] = useState<boolean>(INITIAL_STATE.LOADING);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>(INITIAL_STATE.TRENDING_VIDEOS);

  async function loadTrendingVideos() {
    setIsLoading(true);

    const options = {
      instance,
      region,
      isFake: isFakeDataFetch,
      delay: 1
    } as FetchTrendingVideosOptionsType;

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
    <main className="w-full min-h-screen-minus-navbar">
      <div className="max-w-9xl m-auto py-6 sm:p-6 flex flex-col justify-center">
        <Header.Root className="px-6 sm:px-0">
          <Header.Content>
            <Header.Title icon={<IconFlame size={24} />}>Em alta</Header.Title>
          </Header.Content>
        </Header.Root>

        <div className="flex flex-col-reverse justify-center w-full md:flex-row gap-6">
          <TrendingVideos data={trendingVideos} isLoading={isLoading} />
          <Aside />
        </div>
      </div>
    </main>
  );
}
