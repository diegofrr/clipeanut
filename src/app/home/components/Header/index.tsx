'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import '@/styles/custom-oplayer-ui.css';

import Icons from '@/icons';

import type { IStream } from '@/types';
import { fetchStream, type FetchStreamOptionsType } from '@/services/actions/fetchStreamData';

import { HighlighStreamContext } from '../../contexts/highlightStream';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { isFakeDataFetch } from '@/environments';
import { getStreamMetadata } from '@/utils/Stream/StreamMetadata';
import { StreamUtils } from '@/utils';
import { loadPlayer } from '@/utils/Player';
import { useLocalStorageWithExpiration } from '@/hooks';
import { highlightStreamData } from '@/mocks/highlightStreamData';

import { PIPED_VALUES } from '@/constants';
import { Avatar, Skeleton } from '@nextui-org/react';
const { LOCAL_STORAGE_KEYS } = PIPED_VALUES;

export default function HomeHeader() {
  const { highlightStreamId, highlightStream } = useContext(HighlighStreamContext);
  const { instance } = useContext(PipedInstanceContext);
  const { isExistsItem, getStoragedItem, setStoragedItem } = useLocalStorageWithExpiration();

  const [stream, setStream] = useState<IStream>({} as IStream);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getStreamData = useCallback(async () => {
    const options = {
      streamId: highlightStreamId,
      instance,
      isFake: isFakeDataFetch,
      delay: 1
    } as FetchStreamOptionsType;
    let stream = {} as IStream;
    let mimeType = '';
    let uri = '';

    const boundFetchStream = async () => {
      const data = await fetchStream({ options });
      setStoragedItem(LOCAL_STORAGE_KEYS.HIGHLIGTH_STREAM, { data, highlightStreamId }, { minutes: 15 });
      stream = data;
    };

    try {
      if (isExistsItem(LOCAL_STORAGE_KEYS.HIGHLIGTH_STREAM)) {
        const storagedHighlightStream = getStoragedItem<{ data: IStream; highlightStreamId: string }>(
          LOCAL_STORAGE_KEYS.HIGHLIGTH_STREAM
        );
        if (storagedHighlightStream?.value) {
          if (storagedHighlightStream.value.highlightStreamId === highlightStreamId) {
            stream = storagedHighlightStream.value.data;
          } else await boundFetchStream();
        } else await boundFetchStream();
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
  }, [instance, highlightStreamId]);

  useEffect(() => {
    if (window?.document && highlightStreamId) {
      (async () => {
        loadPlayer({
          ...(await getStreamData()),
          selector: '#oplayer',
          useKeyboard: false,
          onLoad: () => setIsLoaded(true)
        });
      })();
    }
  }, [highlightStreamId, getStreamData]);

  return (
    <header className="flex flex-row w-full bg-neutral-200 dark:bg-neutral-950 p-6 gap-6 rounded-xl">
      <div className="flex relative min-h-0 h-full w-full max-w-[720px] max-h-[480px] rounded-lg overflow-hidden bg-neutral-800">
        <div id="oplayer" className={`${isLoaded ? '' : 'hidden'} w-full max-w-[720px] h-full max-h-[480px]`}></div>
        {!isLoaded && <Skeleton className="w-full h-[20vw]" />}
      </div>

      <div className="bg-netral-850 flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full">
            <Avatar name={stream.uploader} src={highlightStream.uploaderAvatar} />
            {stream.uploaderVerified && (
              <Icons.VerifiedSolid
                size={18}
                className="absolute rounded-full p-[1px] bottom-[-2px] right-[-2px] bg-neutral-200 dark:bg-neutral-950 text-app_orange-600"
              />
            )}
          </div>

          <div>
            <p className="text-lg font-bold">{stream.uploader}</p>

            <p className="break-all text-xs text-gray-800 dark:text-gray-300  inline-flexowrap">
              {StreamUtils.translateUploadedDate(highlightStream.uploadedDate || '')}
            </p>
          </div>
        </div>

        <p className="lg:text-xl xl:text-2xl font-bold">{stream.title}</p>
      </div>
    </header>
  );
}
