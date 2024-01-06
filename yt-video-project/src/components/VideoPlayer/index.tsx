'use client';

import { createRef, useCallback, useContext, useEffect } from 'react';

import shaka from '@/lib/shaka-player';

import { generateDashFileFromFromats } from '@/utils/DashGenerator';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { getStream, _getStream } from '@/services/actions/stream';
import { PIPED_VALUES } from '@/constants';

interface IVideoPlayerProps {
  videoId: string;
  onFailure?: () => void;
  onSuccess?: () => void;
}

export default function VideoPlayer(props: IVideoPlayerProps) {
  const { endpoint } = useContext(PipedInstanceContext);

  const videoRef = createRef<HTMLVideoElement>();
  const videoContainerRef = createRef<HTMLDivElement>();

  const getVideoData = useCallback(async () => {
    const { videoId } = props;
    const streamFormats = [];
    let mimeType = '';
    let uri = '';

    // const stream = await getStream({ videoId, endpoint });
    const stream = await _getStream();

    streamFormats.push(...stream.videoStreams);
    streamFormats.push(...stream.audioStreams);

    if (stream.livestream) {
      uri = stream.hls;
      mimeType = PIPED_VALUES.VIDEO_TYPES.HLS_VIDEO_TYPE;
    } else {
      if (stream.dash) {
        const url = new URL(stream.dash);
        url.searchParams.set('rewrite', 'false');
        uri = url.toString();
      } else {
        const dash = await generateDashFileFromFromats(streamFormats, stream.duration);
        uri = PIPED_VALUES.VIDEO_TYPES.DASH_XML_DATA_URI + btoa(dash);
        mimeType = PIPED_VALUES.VIDEO_TYPES.DASH_XML_VIDEO_TYPE;
      }
    }

    return { mimeType, uri, stream };
  }, [endpoint, props]);

  useEffect(() => {
    if (!window?.document) return;

    const VIDEO_START_TIME = 0;

    const { onFailure, onSuccess } = props;
    const videoElement = videoRef.current;
    const videoContainer = videoContainerRef.current;
    const player = new shaka.Player(videoElement);
    const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);
    const controls = ui.getControls();

    getVideoData()
      .then((data) => {
        const { mimeType, uri, stream } = data;
        player
          .load(uri, VIDEO_START_TIME, mimeType)
          .then(function () {
            videoElement?.setAttribute('poster', stream.thumbnailUrl);
            onSuccess && onSuccess();
          })
          .catch((err: Error) => {
            console.error(err);
          });
      })
      .catch(() => {
        onFailure && onFailure();
      });
  }, [videoRef, videoContainerRef, props, endpoint, getVideoData]);

  return (
    <div>
      <div ref={videoContainerRef} className="mx-auto max-w-full w-[800px]">
        <video className="w-full h-full" ref={videoRef}></video>
      </div>
    </div>
  );
}
