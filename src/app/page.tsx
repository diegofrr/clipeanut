'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import NavBar from '@/components/Navbar';
import ITrendingVideo from '@/types/TrendingVideo';

import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';
import { TrendingVideo } from '@/components/TrendingVideo';
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
      <main className="w-full p-5 bg-white dark:bg-black min-h-screen-minus-navbar">
        <div className="flex justify-start flex-col items-center gap-10 max-w-7xl m-auto mt-20 mb-16">
          <header>
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Vídeos em alta</h1>
          </header>

          {loading && <Spinner />}
          {!loading && trendingVideos.length > 0 && (
            <div className="flex justify-center flex-wrap gap-4 w-full">
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
