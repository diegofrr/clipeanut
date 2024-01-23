'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import './header.css';
import '@/styles/custom-oplayer-ui.css';

import type { IStream } from '@/types';
import { fetchStream, type FetchStreamOptionsType } from '@/services/actions/fetchStreamData';

import { HighlighStreamContext } from '../../contexts/highlightStream';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { isFakeDataFetch } from '@/environments';
import { getStreamMetadata } from '@/utils/Stream/StreamMetadata';
import { loadPlayer } from '@/utils/Player';
import { useLocalStorageWithExpiration } from '@/hooks';
import { highlightStreamData } from '@/mocks/highlightStreamData';

import { PIPED_VALUES } from '@/constants';
const { LOCAL_STORAGE_KEYS } = PIPED_VALUES;

export default function HomeHeader() {
  const { streamId } = useContext(HighlighStreamContext);
  const { instance } = useContext(PipedInstanceContext);
  const { isExistsItem, getStoragedItem, setStoragedItem } = useLocalStorageWithExpiration();

  const [stream, setStream] = useState<IStream>({} as IStream);

  const getStreamData = useCallback(async () => {
    const options = { streamId, instance, isFake: isFakeDataFetch, delay: 1 } as FetchStreamOptionsType;
    let stream = {} as IStream;
    let mimeType = '';
    let uri = '';

    const boundFetchStream = async () => {
      const data = await fetchStream({ options });
      setStoragedItem(LOCAL_STORAGE_KEYS.HIGHLIGTH_STREAM, data, { minutes: 15 });
      stream = data;
    };

    try {
      if (isExistsItem(LOCAL_STORAGE_KEYS.HIGHLIGTH_STREAM)) {
        const storagedHighlightStream = getStoragedItem<IStream>(LOCAL_STORAGE_KEYS.HIGHLIGTH_STREAM);
        if (storagedHighlightStream?.value) stream = storagedHighlightStream.value;
        else await boundFetchStream();
      } else await boundFetchStream();

      if (isFakeDataFetch) {
        stream = highlightStreamData as IStream;
        setStream(stream);
      }

      const metadata = await getStreamMetadata(stream);

      mimeType = metadata.mimeType;
      uri = metadata.uri;
    } catch {
      /* empty */
    } finally {
      setStream(stream);
    }

    return { mimeType, uri, stream };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, streamId]);

  useEffect(() => {
    if (window?.document && streamId) {
      (async () => {
        loadPlayer({ ...(await getStreamData()), selector: '#oplayer', useKeyboard: false });
      })();
    }
  }, [streamId, getStreamData]);

  return (
    <header className="flex flex-row w-full bg-neutral-200 dark:bg-neutral-950 p-6 gap-6 rounded-xl">
      <div className="relative h-full min-h-0 w-full max-w-[720px] rounded-lg overflow-hidden">
        <div id="oplayer" className="h-full"></div>
      </div>

      <div className="bg-netral-850 flex flex-col gap-4 w-full">
        <p className="md:text-xl lg:text-2xl font-bold">{stream.title}</p>
      </div>
    </header>
  );
}
