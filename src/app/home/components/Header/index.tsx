import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import './header.css';

import type { IStream } from '@/types';
import { fetchStream, type FetchStreamOptionsType } from '@/services/actions/fetchStreamData';

import { HighlighStreamContext } from '../../contexts/highlightStream';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { isFakeDataFetch } from '@/environments';
import { getStreamMetadata } from '@/utils/Stream/StreamMetadata';
import { loadPlayer } from '@/utils/Player';

export default function HomeHeader() {
  const { streamId } = useContext(HighlighStreamContext);
  const { instance } = useContext(PipedInstanceContext);

  const [stream, setStream] = useState<IStream>({} as IStream);

  const getStreamData = useCallback(async () => {
    const options = { streamId, instance, isFake: isFakeDataFetch, delay: 1 } as FetchStreamOptionsType;
    let stream = {} as IStream;
    let mimeType = '';
    let uri = '';

    try {
      stream = await fetchStream({ options });
      setStream(stream);

      const metadata = await getStreamMetadata(stream);
      mimeType = metadata.mimeType;
      uri = metadata.uri;
    } catch {
      /* empty */
    }

    return { mimeType, uri, stream };
  }, [instance, streamId]);

  useEffect(() => {
    if (window?.document && streamId) {
      (async () => {
        loadPlayer({ ...(await getStreamData()), selector: '#hightlight-video' });
      })();
    }
  }, [streamId]);

  return (
    <header className="flex flex-row w-full bg-neutral-100 dark:bg-neutral-950 p-6 gap-6 rounded-xl">
      <div className="relative h-full min-h-0 max-w-full min-w-[520px] rounded-lg overflow-hidden">
        <div id="hightlight-video" className="h-full"></div>
      </div>

      <div className="bg-netral-850 flex flex-col gap-4 w-full">
        <p className="text-3xl font-bold">{stream.title}</p>
      </div>
    </header>
  );
}
