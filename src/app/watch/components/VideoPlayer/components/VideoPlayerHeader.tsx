'use client';

import { useContext } from 'react';
import { StreamContext } from '../contexts/stream';

export function VideoPlayerHeader() {
  const { uploader } = useContext(StreamContext);

  return (
    <div>
      <h1>{uploader.uploader}</h1>
      <p>{uploader.uploaderUrl}</p>
      <p>{uploader.uploaderSubscriberCount}</p>
      <p>{uploader.uploaderVerified ? 'Verificado' : 'Não verificado'}</p>
      <img src={uploader.uploaderAvatar} alt="" className="w-10 h-10 rounded-full" />
    </div>
  );
}
