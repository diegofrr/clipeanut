'use client';

import dynamic from 'next/dynamic';

const VideoPlayerContent = dynamic(() => import('./components/VideoPlayerContent'), { ssr: false });
import { VideoPlayerHeader } from './components/VideoPlayerHeader';
import { VideoPlayerRoot } from './components/VideoPlayerRoot';

export const VideoPlayer = {
  Root: VideoPlayerRoot,
  Header: VideoPlayerHeader,
  Content: VideoPlayerContent
};
