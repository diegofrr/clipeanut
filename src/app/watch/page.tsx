'use client';

import { useSearchParams } from 'next/navigation';

import Main from '@/components/Main';
import NotFound from '../not-found';

import { VideoPlayer } from './components/VideoPlayer';

export default function Watch() {
  const streamId = useSearchParams().get('v');

  return !streamId ? (
    <NotFound />
  ) : (
    <Main>
      <div className="py-6 pr-0 sm:pr-6 flex flex-col items-center justify-center">
        <VideoPlayer.Root streamId={streamId}>
          <VideoPlayer.Header />
          <VideoPlayer.Content />
        </VideoPlayer.Root>
      </div>
    </Main>
  );
}
