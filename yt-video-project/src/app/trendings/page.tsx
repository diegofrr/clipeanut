'use client';

import Image from 'next/image';
import { useState } from 'react';

import ITrendingVideo from '@/types/TrendingVideo';
import { _getTrendingVideos } from '@/services/actions/trendingVideos';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>([]);

  async function handleGetTrendingVideos() {
    setLoading(true);
    await _getTrendingVideos({ delay: 0 })
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
              <Image
                className="w-auto h-auto"
                alt={video.title}
                key={index}
                src={video.thumbnail}
                width={400}
                height={200}
              />
            ))}
          </>
        )}
      </main>
    </>
  );
}
