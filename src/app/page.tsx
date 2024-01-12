'use client';

import { useContext, useEffect, useState } from 'react';

import CustomSpinner from '@/components/CustomSpinner';

import type { ITrendingVideo } from '@/types';
import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { TrendingVideo } from '@/app/components/TrendingVideo';
import { isFakeDataFetch } from '@/environments';

import { HOME_PAGE_VALUES } from '@/constants';
import { IconFlame } from '@tabler/icons-react';
import { Header } from '@/components/Header';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

export default function Home() {
  const { region, instance } = useContext(PipedInstanceContext);

  const [loading, setLoading] = useState<boolean>(INITIAL_STATE.LOADING);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>(INITIAL_STATE.TRENDING_VIDEOS);

  async function loadTrendingVideos() {
    setLoading(true);

    const options = { instance, region, isFake: isFakeDataFetch, delay: 1 } as FetchTrendingVideosOptionsType;

    await fetchTrendingVideos({ options })
      .then((data) => {
        setTrendingVideos(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (window?.document) loadTrendingVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full min-h-screen-minus-navbar">
      <div className="flex flex-col items-center max-w-7xl m-auto py-6 sm:p-6 gap-6">
        <Header.Root>
          <Header.Content>
            <Header.Title>
              <IconFlame size={32} /> <h1 className="text-3xl font-bold">Vídeos em alta</h1>
            </Header.Title>
          </Header.Content>
        </Header.Root>

        {loading && <CustomSpinner size="lg" stroke="md" />}
        {!loading && trendingVideos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {trendingVideos.map((video, index) => (
              <TrendingVideo key={index} data={video} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
