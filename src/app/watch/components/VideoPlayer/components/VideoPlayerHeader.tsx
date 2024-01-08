/* eslint-disable @next/next/no-img-element */
'use client';

import { useContext } from 'react';
import { StreamContext } from '../contexts/stream';
import { formatters } from '@/utils';

export function VideoPlayerHeader() {
  const { streamUploader, stream } = useContext(StreamContext);

  return (
    <header className="flex items-center gap-4 text-white flex-row">
      {streamUploader.uploader && (
        <>
          <img src={streamUploader.uploaderAvatar} alt="" className="w-10 h-10 rounded-full font-bold" />
          <div className="flex items-start justify-center flex-col">
            <h1>{streamUploader.uploader}</h1>
            <span className="text-xs text-gray-400">
              {formatters.streamStats(streamUploader.uploaderSubscriberCount)}
            </span>
          </div>
          {streamUploader.uploaderVerified && <span>✅</span>}
          <span>👀 {formatters.streamViews(stream.views)}</span>
          <span>👍 {formatters.streamStats(stream.likes)}</span>
          <span>👎 {formatters.streamStats(stream.dislikes)}</span>
        </>
      )}
    </header>
  );
}
