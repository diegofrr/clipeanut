'use client';

import { createContext, useEffect, useState } from 'react';

import IStream from '@/types/Stream';
import IStreamUploader from '@/types/StreamUploader';

interface IStreamContext {
  stream: IStream;
  uploader: IStreamUploader;
  setStream: React.Dispatch<React.SetStateAction<IStream>>;
}

const INITIAL_STATE = {
  stream: {} as IStream,
  uploader: {} as IStreamUploader,
  setStream: () => {}
};

export const StreamContext = createContext<IStreamContext>(INITIAL_STATE);

export default function StreamProvider({ children }: { children: React.ReactNode }) {
  const [stream, setStream] = useState<IStream>(INITIAL_STATE.stream);
  const [uploader, setUploader] = useState<IStreamUploader>(INITIAL_STATE.uploader);

  useEffect(() => {
    setUploader({
      uploader: stream.uploader,
      uploaderAvatar: stream.uploaderAvatar,
      uploaderSubscriberCount: stream.uploaderSubscriberCount,
      uploaderUrl: stream.uploaderUrl,
      uploaderVerified: stream.uploaderVerified
    });
  }, [stream]);

  return (
    <StreamContext.Provider
      value={{
        stream,
        uploader,
        setStream
      }}
    >
      {children}
    </StreamContext.Provider>
  );
}
