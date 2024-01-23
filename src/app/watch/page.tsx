'use client';

import { useSearchParams } from 'next/navigation';

import Main from '@/components/Main';
import Content from '@/components/Content';
import NotFound from '../not-found';

import { VideoPlayer } from './components/VideoPlayer';

export default function Watch() {
  const streamId = useSearchParams().get('v');

  return !streamId ? (
    <NotFound />
  ) : (
    <Main>
      <Content className="flex justify-center">
        <VideoPlayer.Root streamId={streamId}>
          <VideoPlayer.Header />
          <VideoPlayer.Content />
        </VideoPlayer.Root>
      </Content>
    </Main>
  );
}
