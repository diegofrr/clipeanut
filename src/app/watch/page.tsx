'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import NotFound from '../not-found';
const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false
});

export default function Watch() {
  const videoId = useSearchParams().get('v');

  const [videoNotExists, setVideoNotExists] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  function onGetStreamFailure() {
    setVideoNotExists(true);
  }

  function onGetStreamSuccess() {
    setIsVideoLoaded(true);
  }

  return !videoId || videoNotExists ? (
    <NotFound />
  ) : (
    <div className={`${!isVideoLoaded && 'hidden'}`}>
      <VideoPlayer videoId={videoId} onFailure={onGetStreamFailure} onSuccess={onGetStreamSuccess} />
    </div>
  );
}
