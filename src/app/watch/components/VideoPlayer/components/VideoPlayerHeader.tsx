/* eslint-disable @next/next/no-img-element */
import { createRef, useContext } from 'react';
import { Avatar } from '@nextui-org/react';

import { StreamContext } from '../contexts/stream';
import { StreamUtils } from '@/utils';

export function VideoPlayerHeader() {
  const { streamUploader, stream } = useContext(StreamContext);
  const avatarRef = createRef<HTMLSpanElement>();

  function onLoadAvatarError() {
    const img = avatarRef?.current?.querySelector('img') as HTMLImageElement;
    img.src = streamUploader.uploaderAvatar;
    img.style.opacity = '1';
  }

  return (
    <header className="flex items-center gap-4 flex-row">
      {streamUploader.uploader && (
        <>
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full overflow-hidden">
            <Avatar
              ref={avatarRef}
              name={streamUploader.uploader}
              src={StreamUtils.channelImagemUrlGenerator(streamUploader.uploaderAvatar)}
              onError={onLoadAvatarError}
            />
          </div>
          <div className="flex items-start justify-center flex-col">
            <h1>{streamUploader.uploader}</h1>
            <span className="text-xs">{StreamUtils.formatStreamStats(streamUploader.uploaderSubscriberCount)}</span>
          </div>
          {streamUploader.uploaderVerified && <span>✅</span>}
          <span>👀 {StreamUtils.formatStreamStats(stream.views)}</span>
          <span>👍 {StreamUtils.formatStreamStats(stream.likes)}</span>
          <span>👎 {StreamUtils.formatStreamStats(stream.dislikes)}</span>
        </>
      )}
    </header>
  );
}
