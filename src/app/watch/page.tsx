'use client';

import '@/lib/ShakaPlayer/shaka-player.css';
import NotFound from '../not-found';
import { useSearchParams } from 'next/navigation';

import { VideoPlayer } from './components/VideoPlayer';

// import VideoPlayer from '@/components/VideoPlayer';

export default function Watch() {
  const streamId = useSearchParams().get('v');

  return !streamId ? (
    <NotFound />
  ) : (
    <main className="h-screen w-full flex items-center justify-center">
      <VideoPlayer.Root streamId={streamId}>
        <VideoPlayer.Header />
        <VideoPlayer.Content />
      </VideoPlayer.Root>
    </main>
  );
}
