'use client';

import { createContext, useState } from 'react';

interface IHighlighStreamContext {
  streamId: string;
  setStreamId: React.Dispatch<React.SetStateAction<string>>;
}

type StreamProviderProps = {
  children: React.ReactNode;
};

const INITIAL_STATE = {
  streamId: '',
  setStreamId: () => {}
};

export const HighlighStreamContext = createContext<IHighlighStreamContext>(INITIAL_STATE);

export default function HighlighStreamProvider(props: StreamProviderProps) {
  const [streamId, setStreamId] = useState<string>(INITIAL_STATE.streamId);

  return (
    <HighlighStreamContext.Provider
      value={{
        streamId,
        setStreamId
      }}
    >
      {props.children}
    </HighlighStreamContext.Provider>
  );
}
