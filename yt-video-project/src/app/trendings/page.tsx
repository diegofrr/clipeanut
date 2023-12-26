'use client';

import { useState } from 'react';

import ITrendingVideo from '@/types/TrendingVideo';
import { _getTrendingVideos } from '@/services/actions/trendingVideos';
import { TrendingVideo } from '@/components/TrendingVideo';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>([]);

  async function handleGetTrendingVideos() {
    setLoading(true);
    await _getTrendingVideos({ delay: 1 })
      .then((data) => setTrendingVideos(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <main className="mt-16 bg-zinc-950 min-h-screen">
        <h1 className="text-3xl font-bold underline">Hello World!</h1>
        <button onClick={handleGetTrendingVideos}>Get Trending Videos</button>

        {loading && <p>Loading...</p>}
        {!loading && trendingVideos.length && (
          <>
            {trendingVideos.map((video, index) => (
              <TrendingVideo key={index} data={video} />
            ))}
          </>
        )}
      </main>
    </>
  );
}
