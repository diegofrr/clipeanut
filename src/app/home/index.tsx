'use client';

import { useContext, useEffect, useState } from 'react';

import Aside from './components/Aside/components';

import type { ITrendingVideo } from '@/types';
import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';

import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { isFakeDataFetch } from '@/environments';
import { IconFlame } from '@tabler/icons-react';
import { useWindowSize } from 'usehooks-ts';
import { Trending } from './components/Trending';
import { Header } from '@/components/Header';
import { HOME_PAGE_VALUES } from '@/constants';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

export default function Home() {
  const { region, instance } = useContext(PipedInstanceContext);
  const { width } = useWindowSize();

  const [tab, setTab] = useState<string | number>(INITIAL_STATE.TAB);
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
    <main className="w-full min-h-screen-minus-navbar">
      <div className="max-w-9xl m-auto py-6 sm:p-6 flex flex-col justify-center">
        <Header.Root className="px-6 sm:px-0">
          <Header.Content className="flex flex-row justify-between items-center">
            <Header.Title icon={<IconFlame size={24} />}>Em alta</Header.Title>

            {width < 768 && <Trending.Tabs tab={tab} setTab={setTab} />}
          </Header.Content>
        </Header.Root>

        <div className="flex flex-col-reverse justify-center w-full md:flex-row gap-6">
          <Trending.Videos
            data={trendingVideos}
            isLoading={isLoading}
            isHidden={width >= 768 ? false : tab !== 'videos'}
          />
          <Trending.Musics isHidden={tab !== 'musics' || width >= 768} />
          <Trending.Games isHidden={tab !== 'games' || width >= 768} />
          {width > 768 && <Aside />}
        </div>
      </div>
    </main>
  );
}
