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
import { useLocalStorageWithExpiration } from '@/hooks';
import { highlightStreamData } from '@/mocks/highlightStreamData';

import { PIPED_VALUES } from '@/constants';
import { Avatar, Button, Image, Skeleton } from '@nextui-org/react';
const { LOCAL_STORAGE_KEYS } = PIPED_VALUES;

export default function HomeHeader() {
  const { highlightStreamId, highlightStream } = useContext(HighlighStreamContext);
  const { instance } = useContext(PipedInstanceContext);
  const { isExistsItem, getStoragedItem, setStoragedItem } = useLocalStorageWithExpiration();

  const [stream, setStream] = useState<IStream>({} as IStream);
  const [poster, setPoster] = useState<string>('');

  const getStreamData = useCallback(async () => {
    const options = {
      streamId: highlightStreamId,
      instance,
      isFake: isFakeDataFetch,
      delay: 1
    } as FetchStreamOptionsType;
    let stream = {} as IStream;

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

      if (isFakeDataFetch) stream = highlightStreamData as IStream;

      setStream(stream);
      setPoster(stream.thumbnailUrl);
    } catch {
      /* empty */
    } finally {
      setStream(stream);
    }
  }, [instance, highlightStreamId]);

  useEffect(() => {
    if (window?.document && highlightStreamId) getStreamData();
  }, [highlightStreamId, getStreamData]);

  return (
    <header className="hidden sm:flex flex-row w-full bg-neutral-200 dark:bg-neutral-950 p-6 gap-6 rounded-xl">
      <div className="rounded-lg relative overflow-hidden bg-neutral-800">
        <Image width={1024} height={576} loading="lazy" src={poster} alt="Thumbnail" />
        <div className="absolute left-4 right-4 bottom-4 z-10">{stream.description}</div>
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
