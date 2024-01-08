'use client';

import StreamProvider from '../contexts/stream';

export function VideoPlayerRoot({ children }: { children: React.ReactNode }) {
  return <StreamProvider>{children}</StreamProvider>;
}
