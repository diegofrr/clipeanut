'use client';

import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';

import '@/styles/custom-oplayer-ui.css';

import Icons from '@/icons';

import type { IStream } from '@/types';
import { fetchStream, type FetchStreamOptionsType } from '@/services/actions/fetchStreamData';
import { Button, Image } from '@nextui-org/react';
import { useWindowSize } from 'usehooks-ts';

import { HighlighStreamContext } from '../../contexts/highlightStream';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { isFakeDataFetch } from '@/environments';
import { StreamUtils } from '@/utils';
import { useLocalStorageWithExpiration } from '@/hooks';
import { highlightStreamData } from '@/mocks/highlightStreamData';

import { PIPED_VALUES } from '@/constants';
const { LOCAL_STORAGE_KEYS } = PIPED_VALUES;

export default function HomeHeader() {
  const { isExistsItem, getStoragedItem, setStoragedItem } = useLocalStorageWithExpiration();
  const { width } = useWindowSize();

  const { highlightStreamId, highlightStream } = useContext(HighlighStreamContext);
  const { instance } = useContext(PipedInstanceContext);

  const [stream, setStream] = useState<IStream>();

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
    } catch {
      /* empty */
    } finally {
      setStream(stream);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, highlightStreamId]);

  useEffect(() => {
    if (window?.document && highlightStreamId) getStreamData();
  }, [highlightStreamId, getStreamData]);

  return (
    <header className="hidden sm:flex flex-row items-center w-full bg-neutral-200 dark:bg-neutral-950 p-6 gap-6 rounded-xl relative">
      <div className="rounded-lg relative overflow-hidden w-full max-h-[400px] max-w-[720px]">
        <Image isLoading={!stream} width={720} height={400} loading="lazy" src={stream?.thumbnailUrl} alt="Thumbnail" />

        {stream && (
          <>
            <div className="absolute flex items-center justify-end left-0 right-0 bottom-0 p-4 z-20">
              <Button
                as={Link}
                size={width > 1280 ? 'md' : 'sm'}
                radius="full"
                href={highlightStream.url || ''}
                className="font-medium"
                startContent={<Icons.ClapperboardSolid size={20} />}
                color="warning"
              >
                Assistir
              </Button>
            </div>
            <span className="absolute left-0 bottom-0 right-0 shadow-[0px_0px_6em_8em_#000000] z-[10]" />
          </>
        )}
      </div>

      <div className="bg-netral-850 flex flex-col gap-4 w-full z-10 mb-auto">
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full">
            <Image
              isLoading={!stream}
              alt={stream?.uploader}
              src={stream?.uploaderAvatar}
              height={40}
              width={40}
              radius="full"
              className="z-[1]"
            />
            {stream?.uploaderVerified && (
              <Icons.VerifiedSolid
                size={18}
                className="absolute rounded-full p-[1px] bottom-[-2px] right-[-2px] bg-neutral-200 dark:bg-neutral-950 text-app_orange-600 z-[2]"
              />
            )}
          </div>

          <div>
            <p className="text-lg font-bold">{stream?.uploader}</p>

            <p className="break-all text-xs text-gray-800 dark:text-gray-300  inline-flexowrap">
              {StreamUtils.translateUploadedDate(stream?.uploadDate || '')}
            </p>
          </div>
        </div>

        <p className="lg:text-xl xl:text-2xl font-bold">{stream?.title}</p>
      </div>

      {stream && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={stream?.thumbnailUrl}
          alt="Thumbnail background"
          className="blur-3xl opacity-20 absolute max-h-[50vh] w-full max-w-[80vw] top-[20%] right-0 object-cover pointer-events-none"
        />
      )}
    </header>
  );
}
