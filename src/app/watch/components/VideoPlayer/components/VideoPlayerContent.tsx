'use client';

import './styles/custom-oplayer-ui.css';
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
    const hasMoreThanOneSubtitle = stream.subtitles.length > 1;
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
      player.on('loadeddata', () => initializePlayer(player));
    } catch (error) {
      console.error(error);
    }

    function initializePlayer(player: Player) {
      const video = player.$video;
      const ui = player.context.ui;

      setIsVideoLoaded(true);
      removeSubtitleOption();
      addCustomUiController(ui.$controllerBottom);
      addCustomKeyboardActions(player);

      if (stream.livestream) {
        ui.$coverButton.onclick = () => {
          video.paused ? video.play() : video.pause();
        };
      }
    }

    function addCustomKeyboardActions(player: Player) {
      const seekTime = player.duration / 9;

      document.addEventListener('keydown', ({ code }) => {
        if (code === 'Space') player.togglePlay();
        else if (code === 'm') player.toggleMute();
        else if (code === 'ArrowRight') player.seek(player.currentTime + 5);
        else if (code === 'ArrowLeft') player.seek(player.currentTime - 5);
        else if (code === 'Digit0' || code === 'Numpad0') player.seek(0);
        else if (code === 'Digit1' || code === 'Numpad1') player.seek(seekTime * 1);
        else if (code === 'Digit2' || code === 'Numpad2') player.seek(seekTime * 2);
        else if (code === 'Digit3' || code === 'Numpad3') player.seek(seekTime * 3);
        else if (code === 'Digit4' || code === 'Numpad4') player.seek(seekTime * 4);
        else if (code === 'Digit5' || code === 'Numpad5') player.seek(seekTime * 5);
        else if (code === 'Digit6' || code === 'Numpad6') player.seek(seekTime * 6);
        else if (code === 'Digit7' || code === 'Numpad7') player.seek(seekTime * 7);
        else if (code === 'Digit8' || code === 'Numpad8') player.seek(seekTime * 8);
        else if (code === 'Digit9' || code === 'Numpad9') player.seek(seekTime * 8.8);
      });
    }

    function removeSubtitleOption() {
      if (hasMoreThanOneSubtitle) return;
      document.querySelector('[data-key="oplayer-plugin-dash-Language"]')?.remove();
    }

    function addCustomUiController(controller: HTMLElement) {
      controller.querySelectorAll('button').forEach((button) => {
        button.classList.add('custom-tooltip');
        if (button.getAttribute('aria-label') === 'Volume') {
          button.parentElement?.children[1].classList.add('custom-volume');
        }
      });
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
