'use client';

import { useSearchParams } from 'next/navigation';

import NotFound from '../not-found';

import { VideoPlayer } from './components/VideoPlayer';

export default function Watch() {
  const streamId = useSearchParams().get('v');

  return !streamId ? (
    <NotFound />
  ) : (
    <main className="w-full">
      <div className="max-w-9xl m-auto p-6 flex flex-col justify-center">
        <VideoPlayer.Root streamId={streamId}>
          <VideoPlayer.Header />
          <VideoPlayer.Content />
        </VideoPlayer.Root>
      </div>
    </main>
  );
}
