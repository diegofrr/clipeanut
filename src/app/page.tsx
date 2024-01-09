'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import NavBar from '@/components/Navbar';
import ITrendingVideo from '@/types/TrendingVideo';

import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';
import { TrendingVideo } from '@/app/components/TrendingVideo';
import { Spinner } from '@nextui-org/react';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { isFakeDataFetch } from '@/environments';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>([]);

  const { endpoint, region, instance } = useContext(PipedInstanceContext);

  const handleGetTrendingVideos = useCallback(async () => {
    setLoading(true);
    const options = { endpoint, region, isFake: isFakeDataFetch, delay: 1 } as FetchTrendingVideosOptionsType;

    await fetchTrendingVideos({ options })
      .then((data) => setTrendingVideos(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [endpoint, region]);

  useEffect(() => {
    handleGetTrendingVideos();
  }, [instance, handleGetTrendingVideos]);

  return (
    <>
      <NavBar />
      <main className="w-full p-4 bg-white dark:bg-black min-h-screen">
        <div className="flex flex-col items-center gap-10 max-w-7xl m-auto mt-20 mb-16">
          <header className="w-full">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Vídeos em alta</h1>
          </header>

          {loading && <Spinner />}
          {!loading && trendingVideos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
              {trendingVideos.map((video, index) => (
                <TrendingVideo key={index} data={video} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
