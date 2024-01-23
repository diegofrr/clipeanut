import type { IStream } from '@/types';
import { StreamUtils } from '..';

import { PIPED_VALUES } from '@/constants';

export async function getStreamMetadata(stream: IStream) {
  const streamFormats = [];
  let mimeType = '';
  let uri = '';

  streamFormats.push(...stream.videoStreams);
  streamFormats.push(...stream.audioStreams);

  try {
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
  } catch {
    /* empty */
  }

  return { uri, mimeType };
}
