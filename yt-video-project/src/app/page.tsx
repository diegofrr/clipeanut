'use client';

import { useEffect, useState } from 'react';

import ITrendingVideo from '@/types/TrendingVideo';
import { _getTrendingVideos } from '@/services/actions/trendingVideos';
import { TrendingVideo } from '@/components/TrendingVideo';
import { Button, Spinner } from '@nextui-org/react';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>([]);

  useEffect(() => {
    handleGetTrendingVideos();
  }, []);

  async function handleGetTrendingVideos() {
    setLoading(true);
    await _getTrendingVideos({ delay: 1 })
      .then((data) => setTrendingVideos(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <main className="min-h-screen-minus-navbar mt-16 w-full p-5 flex justify-start flex-col items-center gap-10 max-w-7xl m-auto">
      <header>
        <h1 className="text-3xl font-bold text-white">Vídeos em alta</h1>
      </header>

      {loading && <Spinner />}
      {!loading && trendingVideos.length > 0 && (
        <div className="flex justify-center flex-wrap gap-8 w-full">
          {trendingVideos.map((video, index) => (
            <TrendingVideo key={index} data={video} />
          ))}
        </div>
      )}
    </main>
  );
}
