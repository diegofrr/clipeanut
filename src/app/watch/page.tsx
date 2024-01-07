'use client';

import dynamic from 'next/dynamic';
import '@/lib/ShakaPlayer/shaka-player.css';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import NotFound from '../not-found';
import { Spinner } from '@nextui-org/react';

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false });

// import VideoPlayer from '@/components/VideoPlayer';

export default function Watch() {
  const videoId = useSearchParams().get('v');

  const [videoNotExists, setVideoNotExists] = useState(false);

  function onGetStreamFailure() {
    // setVideoNotExists(true);
    console.log('FAILURE');
  }

  function onGetStreamSuccess() {
    // setIsVideoLoaded(true);
    console.log('SUCCESS');
  }

  return !videoId || videoNotExists ? (
    <NotFound />
  ) : (
    <>
      <VideoPlayer videoId={videoId} onFailure={onGetStreamFailure} onSuccess={onGetStreamSuccess} />
    </>
  );
}
