'use client';

import Link from 'next/link';
import NavBar from '@/components/Navbar';
import { _getTrendingVideos } from '@/services/actions/trendingVideos';
import ITrendingVideo from '@/types/TrendingVideo';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>([]);
  async function handleGetTrendingVideos() {
    setLoading(true);
    await _getTrendingVideos({ region: 'BR' })
      .then((data) => setTrendingVideos(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <NavBar />
      <main className="mt-16 bg-zinc-950 h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-bold underline">Hello World!</h1>
        <button onClick={handleGetTrendingVideos}>Get Trending Videos</button>
        <Link href="/trendings">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded-md m-5">
            Go to Trending Videos
          </button>
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
        </Link>
      </main>
    </>
  );
}
