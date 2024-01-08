'use client';

import '@/lib/ShakaPlayer/shaka-player.css';
import NotFound from '../not-found';
import { useSearchParams } from 'next/navigation';

import { VideoPlayer } from './components/VideoPlayer';

// import VideoPlayer from '@/components/VideoPlayer';

export default function Watch() {
  const videoId = useSearchParams().get('v');

  return !videoId ? (
    <NotFound />
  ) : (
    <>
      <VideoPlayer.Root>
        <VideoPlayer.Header />
        <VideoPlayer.Content />
      </VideoPlayer.Root>
    </>
  );
}
