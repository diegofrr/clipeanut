'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { StreamContext } from '../contexts/stream';

import Player, { PlayerPlugin } from '@oplayer/core';
import ui from '@oplayer/ui';
import ODash from '@oplayer/dash';
import OHls from '@oplayer/hls';

import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';
import { StreamUtils } from '@/utils';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { isFakeDataFetch } from '@/environments';

import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';
import { VideoPlayerLoading } from './VideoPlayerLoading';
import { Button } from '@nextui-org/react';
import { IconMessages } from '@tabler/icons-react';

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

    if (options.isFake) {
      uri = DEFAULT_VALUES.FAKE_VIDEO_URI;
      mimeType = 'auto';
    } else if (stream.livestream) {
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

  async function loadPlayer() {
    const { mimeType, uri, stream } = await getStreamData();

    let type = {} as () => PlayerPlugin;
    type = mimeType === 'dash' ? ODash : mimeType === 'hls' ? OHls : type;

    console.log(type, stream.livestream);

    try {
      Player.make('#oplayer', {
        isLive: stream.livestream,
        autoplay: true,
        muted: true,
        lang: 'auto',
        preload: 'metadata',
        source: {
          src: uri,
          format: mimeType,
          title: stream.title,
          poster: stream.thumbnailUrl
        }
      })
        .use([
          ui({
            pictureInPicture: true,
            theme: {
              primaryColor: 'orange'
            },
            slideToSeek: 'always'
          }),
          type()
        ])
        .create()
        .on('loadstart', () => setIsVideoLoaded(true));
    } catch (error) {
      console.error('Error fetching stream:', error);
    }
  }

  function handleOpenChat() {
    window.open(`https://www.youtube.com/live_chat?v=${streamId}`, '_blank', 'width=400,height=600');
  }

  useEffect(() => {
    if (window?.document) loadPlayer();
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
          endContent={<IconMessages />}
          className="bg-app_orange-500 text-black font-medium"
        >
          Abrir chat
        </Button>
      )}
    </div>
  );
}
