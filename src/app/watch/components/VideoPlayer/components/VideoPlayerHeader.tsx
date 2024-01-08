'use client';

import { useContext } from 'react';
import { StreamContext } from '../contexts/stream';

export function VideoPlayerHeader() {
  const { streamUploader } = useContext(StreamContext);

  const { uploader, uploaderAvatar, uploaderSubscriberCount, uploaderUrl, uploaderVerified } = streamUploader;

  return (
    <div>
      <h1>{uploader}</h1>
      <p>{uploaderUrl}</p>
      <p>{uploaderSubscriberCount}</p>
      <p>{uploaderVerified ? 'Verificado' : 'Não verificado'}</p>
      <img src={uploaderAvatar} alt="" className="w-10 h-10 rounded-full" />
    </div>
  );
}
