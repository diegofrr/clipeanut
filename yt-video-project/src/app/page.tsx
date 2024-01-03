'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import ITrendingVideo from '@/types/TrendingVideo';
import { _getTrendingVideos } from '@/services/actions/trendingVideos';
import { TrendingVideo } from '@/components/TrendingVideo';
import { Button, Spinner } from '@nextui-org/react';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import NavBar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>([]);

  const { endpoint, region, setRegion, instance, setInstance } = useContext(PipedInstanceContext);

  const handleGetTrendingVideos = useCallback(async () => {
    setLoading(true);
    // const options = { endpoint, region };

    // await getTrendingVideos({ options })
    //   .then((data) => setTrendingVideos(data))
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));

    await _getTrendingVideos({ delay: 1 })
      .then((data) => setTrendingVideos(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    handleGetTrendingVideos();
  }, [instance, handleGetTrendingVideos]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen-minus-navbar mt-16 w-full p-5 flex justify-start flex-col items-center gap-10 max-w-7xl m-auto">
        <header>
          <h1 className="text-3xl font-bold text-white">Vídeos em alta</h1>
          <h2 className="text-gray-600 text-sm">Região: {region}</h2>
          <h2 className="text-gray-600 text-sm">Instância: {instance}</h2>
          <Button onClick={() => setRegion('US')}>Alterar região</Button>
          <Button onClick={() => setInstance('lunar.icu')}>Alterar instância</Button>
          <Link href="/settings">
            <Button color="primary" radius="sm" className="mt-5">
              Go to Settings
            </Button>
          </Link>
        </header>

        {loading && <Spinner />}
        {!loading && trendingVideos.length > 0 && (
          <div className="flex justify-center flex-wrap gap-8 w-full">
            {trendingVideos.map((video, index) => (
              <TrendingVideo key={index} data={video} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
