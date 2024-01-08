'use client';

import StreamProvider from '../contexts/stream';

export function VideoPlayerRoot({ children }: { children: React.ReactNode }) {
  return (
    <StreamProvider>
      <div className="w-[800px] flex flex-col gap-4 m-[calc(100%-32px)]">{children}</div>
    </StreamProvider>
  );
}
