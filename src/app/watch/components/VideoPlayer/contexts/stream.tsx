'use client';

import { createContext, useEffect, useState } from 'react';

import IStream from '@/types/Stream';
import IStreamUploader from '@/types/StreamUploader';

interface IStreamContext {
  streamId: string;
  stream: IStream;
  streamUploader: IStreamUploader;
  setStream: React.Dispatch<React.SetStateAction<IStream>>;
  setStreamId: React.Dispatch<React.SetStateAction<string>>;
}

type StreamProviderProps = {
  children: React.ReactNode;
  streamId: string;
};

const INITIAL_STATE = {
  streamId: '',
  stream: {} as IStream,
  streamUploader: {} as IStreamUploader,
  setStream: () => {},
  setStreamId: () => {}
};

export const StreamContext = createContext<IStreamContext>(INITIAL_STATE);

export default function StreamProvider(props: StreamProviderProps) {
  const [streamId, setStreamId] = useState<string>(props.streamId);
  const [stream, setStream] = useState<IStream>(INITIAL_STATE.stream);
  const [streamUploader, setStreamUploader] = useState<IStreamUploader>(INITIAL_STATE.streamUploader);

  useEffect(() => {
    setStreamUploader({
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
        streamId,
        stream,
        streamUploader,
        setStream,
        setStreamId
      }}
    >
      {props.children}
    </StreamContext.Provider>
  );
}
