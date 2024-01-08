'use client';

import StreamProvider from '../contexts/stream';

export function VideoPlayerRoot({ children }: { children: React.ReactNode }) {
  return (
    <StreamProvider>
      <div className="w-[800px] flex flex-col gap-4 max-w-full-minus-2rem">{children}</div>
    </StreamProvider>
  );
}
