'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import ITrendingVideo from '@/types/TrendingVideo';
import {
  _getTrendingVideos,
  getTrendingVideos
} from '@/services/actions/trendingVideos';
import { TrendingVideo } from '@/components/TrendingVideo';
import { Button, Spinner } from '@nextui-org/react';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>([]);

  const { endpoint, setEndpoint, region, setRegion } =
    useContext(PipedInstanceContext);

  const handleGetTrendingVideos = useCallback(async () => {
    setLoading(true);
    await _getTrendingVideos({ delay: 1 })
      .then((data) => setTrendingVideos(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [region]);

  useEffect(() => {
    handleGetTrendingVideos();
  }, [endpoint, region, handleGetTrendingVideos]);

  return (
    <main className="min-h-screen-minus-navbar mt-16 w-full p-5 flex justify-start flex-col items-center gap-10 max-w-7xl m-auto">
      <header>
        <h1 className="text-3xl font-bold text-white">Vídeos em alta</h1>
        <h2>{endpoint}</h2>
        <Button
          color="primary"
          onClick={() => setRegion(region === 'BR' ? 'US' : 'BR')}
        >
          Alterar endpoint
        </Button>
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
