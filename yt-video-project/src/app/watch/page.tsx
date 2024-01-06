'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import NotFound from '../not-found';
import VideoPlayer from '@/components/VideoPlayer';

export default function Watch() {
  const videoId = useSearchParams().get('v');
  const [videoNotExists, setVideoNotExists] = useState(false);

  if (!videoId) return <NotFound />;

  function onGetStreamFailure() {
    setVideoNotExists(true);
  }

  function onGetStreamSuccess() {
    console.log('success');
  }

  return videoNotExists ? (
    <NotFound />
  ) : (
    <VideoPlayer videoId={videoId} onFailure={onGetStreamFailure} onSuccess={onGetStreamSuccess} />
  );
}
