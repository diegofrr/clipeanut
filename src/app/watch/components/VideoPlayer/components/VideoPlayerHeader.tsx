/* eslint-disable @next/next/no-img-element */
'use client';

import { useContext } from 'react';
import { StreamContext } from '../contexts/stream';

export function VideoPlayerHeader() {
  const { streamUploader, stream } = useContext(StreamContext);

  function formatSubscriberCount(count: number) {
    if (count >= 1e9) {
      return (count / 1e9).toFixed(1).replace(/\.0$/, '') + 'bi';
    } else if (count >= 1e6) {
      return (Math.floor(count / 1e5) / 10).toFixed(1).replace(/\.0$/, '') + 'mi';
    } else if (count >= 1e3) {
      return (Math.floor(count / 1e2) / 10).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
      return count?.toString();
    }
  }

  return (
    <header className="flex items-center gap-4 text-white flex-row">
      {streamUploader.uploader && (
        <>
          <img src={streamUploader.uploaderAvatar} alt="" className="w-10 h-10 rounded-full font-bold" />
          <div className="flex items-start justify-center flex-col">
            <h1>{streamUploader.uploader}</h1>
            <span className="text-xs text-gray-400">
              {formatSubscriberCount(streamUploader.uploaderSubscriberCount)}
            </span>
          </div>
          {streamUploader.uploaderVerified && <span>✅</span>}
          <span>👀 {formatSubscriberCount(stream.views)}</span>
          <span>👍 {formatSubscriberCount(stream.likes)}</span>
          <span>👎 {formatSubscriberCount(stream.dislikes)}</span>
        </>
      )}
    </header>
  );
}
