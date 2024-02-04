'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import '@/styles/custom-oplayer-ui.css';

import Icons from '@/icons';

import type { IStream } from '@/types';
import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';

import { StreamContext } from '../contexts/stream';

import { Button } from '@nextui-org/react';
import { VideoPlayerLoading } from './VideoPlayerLoading';
import { VideoPlayerError } from './VideoPlayerError';

import { isFakeDataFetch } from '@/environments';
import { loadPlayer } from '@/utils/Player';
import { getStreamMetadata } from '@/utils/Stream/StreamMetadata';

import { PIPED_VALUES } from '@/constants';
const { DEFAULT_INSTANCE_LIST } = PIPED_VALUES;

export default function VideoPlayerContent() {
  const { stream, setStream, streamId } = useContext(StreamContext);

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isLoadingFailed, setIsLoadingFailed] = useState<boolean>(false);

  let instanceList = DEFAULT_INSTANCE_LIST;

  const retryGetStreamData = useCallback(async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    instanceList = instanceList.slice(1);

    loadPlayer({
      ...(await getStreamData()),
      selector: '#oplayer',
      onLoad: () => setIsVideoLoaded(true),
      onError: retryGetStreamData
    });
  }, []);

  const getStreamData = useCallback(async () => {
    setIsVideoLoaded(false);
    const instance = instanceList[0];

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
      if (instanceList?.length) retryGetStreamData();
      else setIsLoadingFailed(true);
    }

    return { mimeType, uri, stream };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instanceList, retryGetStreamData, setStream, streamId]);

  function handleOpenChat() {
    window.open(`https://www.youtube.com/live_chat?v=${streamId}`, '_blank', 'width=400,height=600');
  }

  useEffect(() => {
    if (window?.document) {
      (async () => {
        loadPlayer({
          ...(await getStreamData()),
          selector: '#oplayer',
          onLoad: () => setIsVideoLoaded(true),
          onError: retryGetStreamData
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoadingFailed ? (
        <VideoPlayerError />
      ) : (
        <div className="flex flex-col gap-2 items-start">
          {!isVideoLoaded && <VideoPlayerLoading />}

          <div className="w-full relative">
            <div id="oplayer" className="overflow-hidden rounded-lg w-full"></div>
          </div>

          <Button
            color="warning"
            variant="ghost"
            radius="full"
            isLoading={!isVideoLoaded}
            onClick={retryGetStreamData}
            startContent={<span>{isVideoLoaded ? 'Recarregar' : 'Recarregando...'}</span>}
          />

          {isVideoLoaded && stream.livestream && (
            <Button
              onClick={handleOpenChat}
              endContent={<Icons.ExternalLink size={18} />}
              className="bg-app_orange-500 text-black font-medium"
            >
              Abrir chat em outra janela
            </Button>
          )}
        </div>
      )}
    </>
  );
}
