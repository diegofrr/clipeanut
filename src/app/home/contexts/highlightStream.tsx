'use client';

import { ITrendingVideo } from '@/types';
import { createContext, useEffect, useState } from 'react';

interface IHighlighStreamContext {
  highlightStreamId: string;
  highlightStream: ITrendingVideo;
  setHighlightStream: React.Dispatch<React.SetStateAction<ITrendingVideo>>;
}

type StreamProviderProps = {
  children: React.ReactNode;
};

const INITIAL_STATE = {
  highlightStreamId: '',
  highlightStream: {} as ITrendingVideo,
  setHighlightStreamId: () => {},
  setHighlightStream: () => {}
};

export const HighlighStreamContext = createContext<IHighlighStreamContext>(INITIAL_STATE);

export default function HighlighStreamProvider(props: StreamProviderProps) {
  const [highlightStreamId, setHighlightStreamId] = useState<string>(INITIAL_STATE.highlightStreamId);
  const [highlightStream, setHighlightStream] = useState<ITrendingVideo>(INITIAL_STATE.highlightStream);

  useEffect(() => {
    if (highlightStream.url) setHighlightStreamId(highlightStream.url.split('v=')[1]);
  }, [highlightStream]);

  return (
    <HighlighStreamContext.Provider
      value={{
        highlightStreamId,
        highlightStream,
        setHighlightStream
      }}
    >
      {props.children}
    </HighlighStreamContext.Provider>
  );
}
