import type { IStream } from '@/types';

import Player, { Lang } from '@oplayer/core';
import ODash from '@oplayer/dash';
import OHls from '@oplayer/hls';
import ui from '@oplayer/ui';

import * as UIUtils from './custom-ui';

import { languages } from './languages';
import { PlaybackRateIcon, SettingsIcon, VolumeOffIcon, VolumeOnIcon } from './custom-icons';

type LoadPlayerProps = {
  uri: string;
  mimeType: string;
  stream: IStream;
  selector: string;
  useKeyboard?: boolean;
  onLoad?: () => void;
};

export async function loadPlayer({ uri, mimeType, stream, onLoad, selector, useKeyboard = true }: LoadPlayerProps) {
  destroyPlayerHTMLElement();

  const hasMoreThanOneSubtitle = stream?.subtitles?.length > 1;
  const type = mimeType === 'dash' ? ODash : OHls;

  try {
    const player = Player.make(selector, {
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
        icons: {
          setting: SettingsIcon,
          playbackRate: PlaybackRateIcon,
          volume: [VolumeOnIcon, VolumeOffIcon]
        },
        pictureInPicture: true,
        keyboard: { focused: useKeyboard, global: useKeyboard },
        theme: { primaryColor: '#F4AD2A' },
        slideToSeek: 'always',
        miniProgressBar: false
      }),
      type()
    ]);

    player.create();
    player.on('loadstart', () => onLoad && onLoad());
    player.on('loadeddata', () => initializePlayer(player));
    player.on('fullscreenchange', () => fixFullscreenVideoSize(player));
  } catch {
    /* empty */
  }

  function destroyPlayerHTMLElement() {
    if (window?.document) {
      const player = window.document.querySelector('#oplayer');
      if (player) player.innerHTML = '';
    }
  }

  function fixFullscreenVideoSize(player: Player) {
    const video = player.$video;
    video.classList.toggle('is-fullscreen');
  }

  function initializePlayer(player: Player) {
    const video = player.$video;
    const ui = player.context.ui;

    UIUtils.removeSubtitleOption(hasMoreThanOneSubtitle);
    UIUtils.addCustomUiController(ui.$controllerBottom);
    if (useKeyboard) UIUtils.addCustomKeyboardActions(player);

    if (stream.livestream) {
      ui.$coverButton.onclick = () => {
        video.paused ? video.play() : video.pause();
      };
    }
  }
}
