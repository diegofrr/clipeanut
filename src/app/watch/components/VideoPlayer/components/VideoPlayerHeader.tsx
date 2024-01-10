/* eslint-disable @next/next/no-img-element */

import { useContext } from 'react';
import { Image } from '@nextui-org/react';
import { StreamContext } from '../contexts/stream';
import { channelImagemUrlGenerator, formatters } from '@/utils';

export function VideoPlayerHeader() {
  const { streamUploader, stream } = useContext(StreamContext);

  return (
    <header className="flex items-center gap-4 text-white flex-row">
      {streamUploader.uploader && (
        <>
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={channelImagemUrlGenerator(streamUploader.uploaderAvatar)}
              alt={streamUploader.uploader + ' avatar'}
              width={40}
              height={40}
              className="h-10 w-10 min-w-10 min-h-10"
            />
          </div>
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
