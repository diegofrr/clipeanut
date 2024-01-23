'use client';

// Libs externas
import { useCallback, useContext, useEffect, useState } from 'react';

import './styles/custom-oplayer-ui.css';

import Player, { Lang } from '@oplayer/core';
import ODash from '@oplayer/dash';
import OHls from '@oplayer/hls';
import ui from '@oplayer/ui';

import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';

import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { StreamContext } from '../contexts/stream';

import { Button } from '@nextui-org/react';
import { IconExternalLink } from '@tabler/icons-react';
import { VideoPlayerLoading } from './VideoPlayerLoading';

import { isFakeDataFetch } from '@/environments';
import { PIPED_VALUES } from '@/constants';
import { languages } from './languages';
import { loadPlayer } from '@/utils/Player';
import { PlayerUtils } from './utils';
import { StreamUtils } from '@/utils';
import { IStream } from '@/types';

export default function VideoPlayerContent() {
  const { stream, setStream, streamId } = useContext(StreamContext);
  const { instance } = useContext(PipedInstanceContext);

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  const getStreamData = useCallback(async () => {
    const streamFormats = [];
    let mimeType = '';
    let uri = '';

    const options = { streamId, instance, isFake: isFakeDataFetch, delay: 1 } as FetchStreamOptionsType;

    const stream = await fetchStream({ options });
    setStream(stream);

    try {
      streamFormats.push(...stream.videoStreams);
      streamFormats.push(...stream.audioStreams);
    } catch {
      /* empty */
    }

    if (stream.livestream) {
      uri = stream.hls;
      mimeType = 'hls';
    } else if (stream.dash) {
      const url = new URL(stream.dash);
      url.searchParams.set('rewrite', 'false');
      uri = url.toString();
      mimeType = 'dash';
    } else {
      const dash = await StreamUtils.generateDashFileFromFormats(streamFormats, stream.duration);
      uri = PIPED_VALUES.VIDEO_TYPES.DASH_XML_DATA_URI + btoa(dash);
      mimeType = 'dash';
    }

    return { mimeType, uri, stream };
  }, [instance, setStream, streamId]);

  function handleOpenChat() {
    window.open(`https://www.youtube.com/live_chat?v=${streamId}`, '_blank', 'width=400,height=600');
  }

  useEffect(() => {
    if (window?.document) {
      (async () => {
        const data = await getStreamData();
        loadPlayer({ ...data, onLoad: () => setIsVideoLoaded(true) });
      })();
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
