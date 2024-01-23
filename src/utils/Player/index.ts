import type { IStream } from '@/types';

import Player, { Lang } from '@oplayer/core';
import ODash from '@oplayer/dash';
import OHls from '@oplayer/hls';
import ui from '@oplayer/ui';

import * as UIUtils from './custom-ui';

import { languages } from './languages';

type LoadPlayerProps = {
  uri: string;
  mimeType: string;
  stream: IStream;
  onLoad?: () => void;
};

export async function loadPlayer({ uri, mimeType, stream, onLoad }: LoadPlayerProps) {
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
    player.on('loadstart', () => onLoad?.());
    player.on('loadeddata', () => initializePlayer(player));
  } catch (error) {
    console.error(error);
  }

  function initializePlayer(player: Player) {
    const video = player.$video;
    const ui = player.context.ui;

    onLoad?.();
    UIUtils.removeSubtitleOption(hasMoreThanOneSubtitle);
    UIUtils.addCustomUiController(ui.$controllerBottom);
    UIUtils.addCustomKeyboardActions(player);

    if (stream.livestream) {
      ui.$coverButton.onclick = () => {
        video.paused ? video.play() : video.pause();
      };
    }
  }
}
