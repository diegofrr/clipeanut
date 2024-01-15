'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { StreamContext } from '../contexts/stream';

import Player, { Lang } from '@oplayer/core';
import ui from '@oplayer/ui';
import ODash from '@oplayer/dash';
import OHls from '@oplayer/hls';

import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';
import { StreamUtils } from '@/utils';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { isFakeDataFetch } from '@/environments';

import { PIPED_VALUES } from '@/constants';
import { VideoPlayerLoading } from './VideoPlayerLoading';
import { Button } from '@nextui-org/react';
import { IconExternalLink } from '@tabler/icons-react';
import { languages } from './languages';

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

  async function loadPlayer() {
    const { mimeType, uri, stream } = await getStreamData();
    const hasSubtitles = stream.subtitles.length;
    const type = mimeType === 'dash' ? ODash : OHls;

    try {
      const player = Player.make('#oplayer', {
        isLive: stream.livestream,
        autoplay: stream.livestream,
        muted: stream.livestream,
        preload: 'metadata',
        source: {
          src: uri,
          format: mimeType,
          poster: stream.thumbnailUrl
        }
      });

      player.locales.update(languages);
      player.locales.lang = 'pt' as Lang;

      player.use([
        ui({
          pictureInPicture: true,
          keyboard: { focused: true, global: true },
          theme: { primaryColor: '#F4AD2A' },
          slideToSeek: 'always',
          miniProgressBar: false
        }),
        type()
      ]);

      player.create();
      player.on('loadstart', () => setIsVideoLoaded(true));
      player.on('canplay', () => initializePlayer(player));
    } catch (error) {
      console.error(error);
    }

    function initializePlayer(player: Player) {
      setIsVideoLoaded(true);
      removeSubtitleOption();
      const video = player.$video;
      const ui = player.context.ui;
      ui.$coverButton.onclick = () => {
        video.paused ? video.play() : video.pause();
      };
    }

    function removeSubtitleOption() {
      if (!hasSubtitles) document.querySelector('[data-key="oplayer-plugin-dash-Language"]')?.remove();
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
          endContent={<IconExternalLink size={18} />}
          className="bg-app_orange-500 text-black font-medium"
        >
          Abrir chat em outra janela
        </Button>
      )}
    </div>
  );
}
