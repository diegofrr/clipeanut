'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import './styles/custom-oplayer-ui.css';

import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';

import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { StreamContext } from '../contexts/stream';

import { Button } from '@nextui-org/react';
import { IconExternalLink } from '@tabler/icons-react';
import { VideoPlayerLoading } from './VideoPlayerLoading';

import { isFakeDataFetch } from '@/environments';
import { PIPED_VALUES } from '@/constants';
import { loadPlayer } from '@/utils/Player';
import { StreamUtils } from '@/utils';
import { getStreamMetadata } from '@/utils/Stream/StreamMetadata';

export default function VideoPlayerContent() {
  const { stream, setStream, streamId } = useContext(StreamContext);
  const { instance } = useContext(PipedInstanceContext);

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  const getStreamData = useCallback(async () => {
    const options = { streamId, instance, isFake: isFakeDataFetch, delay: 1 } as FetchStreamOptionsType;

    const stream = await fetchStream({ options });
    setStream(stream);

    const { uri, mimeType } = await getStreamMetadata(stream);

    return { mimeType, uri, stream };
  }, [instance, setStream, streamId]);

  function handleOpenChat() {
    window.open(`https://www.youtube.com/live_chat?v=${streamId}`, '_blank', 'width=400,height=600');
  }

  useEffect(() => {
    if (window?.document) {
      (async () => loadPlayer({ ...(await getStreamData()), onLoad: () => setIsVideoLoaded(true) }))();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2 items-start">
      {!isVideoLoaded && <VideoPlayerLoading />}

      <div className="w-full relative">
        <div id="oplayer" className="overflow-hidden rounded-lg w-full"></div>
      </div>

      {isVideoLoaded && stream.livestream && (
        <Button
          onClick={handleOpenChat}
          endContent={<IconExternalLink size={18} />}
          className="bg-app_orange-500 text-black font-medium"
        >
          Abrir chat em outra janela
        </Button>
      )}
    </div>
  );
}
