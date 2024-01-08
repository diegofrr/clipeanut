/* eslint-disable @next/next/no-img-element */
'use client';

import { useContext } from 'react';
import { StreamContext } from '../contexts/stream';

export function VideoPlayerHeader() {
  const { streamUploader } = useContext(StreamContext);

  const { uploader, uploaderAvatar, uploaderSubscriberCount, uploaderVerified } = streamUploader;

  function formatSubscriberCount(count: number) {
    if (count >= 1e9) {
      return (count / 1e9).toFixed(1).replace(/\.0$/, '') + 'b';
    } else if (count >= 1e6) {
      return (Math.floor(count / 1e5) / 10).toFixed(1).replace(/\.0$/, '') + 'm';
    } else if (count >= 1e3) {
      return (Math.floor(count / 1e2) / 10).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
      return count.toString();
    }
  }

  return (
    <header className="flex items-center gap-4 text-white flex-row">
      <img src={uploaderAvatar} alt="" className="w-10 h-10 rounded-full" />
      <div className="flex items-start justify-center flex-col">
        <h1>{uploader}</h1>
        <span className="text-xs">{formatSubscriberCount(uploaderSubscriberCount)}</span>
      </div>
      {uploaderVerified && <span>✅</span>}
    </header>
  );
}
