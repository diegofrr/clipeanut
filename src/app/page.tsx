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
      <div className="max-w-9xl m-auto py-6 sm:p-6 flex flex-col justify-center">
        <Header.Root className="px-6 sm:px-0">
          <Header.Content>
            <Header.Title>
              <IconFlame size={24} /> <h1 className="text-2xl font-bold">Vídeos em alta</h1>
            </Header.Title>
          </Header.Content>
        </Header.Root>

        <div className="flex flex-col-reverse justify-center w-full md:flex-row gap-6">
          {loading && <CustomSpinner size="lg" stroke="md" className="absolute" />}
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {!loading && trendingVideos.length > 0 && (
              <>
                {trendingVideos.map((video, index) => (
                  <TrendingVideo key={index} data={video} />
                ))}
              </>
            )}
          </div>

          <aside className="md:sticky bg-purple-950 min-w-full md:min-w-[200px] rounded-lg p-6 lg:min-w-[280px] md:top-[calc(65px+1.5rem)] h-32 md:h-[400px]">
            <h2>Mais assistidos</h2>
          </aside>
        </div>
      </div>
    </main>
  );
}
