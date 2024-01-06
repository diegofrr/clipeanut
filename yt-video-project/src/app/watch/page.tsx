'use client';

import { useSearchParams } from 'next/navigation';

import NotFound from '../not-found';
import VideoPlayer from '@/components/VideoPlayer';
import { useState } from 'react';

export default function Watch() {
  const videoId = useSearchParams().get('v');
  const [videoNotExists, setVideoNotExists] = useState(false);

  if (!videoId) return <NotFound />;

  function onGetStreamFailed() {
    setVideoNotExists(true);
  }

  return videoNotExists ? <NotFound /> : <VideoPlayer videoId={videoId} callbackOnVideoNotExists={onGetStreamFailed} />;
}
