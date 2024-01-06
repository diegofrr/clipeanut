'use client';

import { createRef, useCallback, useContext, useEffect } from 'react';

import shaka from '@/lib/shaka-player';

import { generateDashFileFromFromats } from '@/utils/DashGenerator';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { getStream, _getStream } from '@/services/actions/stream';
import { PIPED_VALUES } from '@/constants';

interface IVideoPlayerProps {
  videoId: string;
  callbackOnVideoNotExists: () => void;
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

    if (!stream.dash) {
      const dash = await generateDashFileFromFromats(streamFormats, stream.duration);
      uri = PIPED_VALUES.VIDEO_TYPES.DASH_XML_DATA_URI + btoa(dash);
      mimeType = PIPED_VALUES.VIDEO_TYPES.DASH_XML_VIDEO_TYPE;
    }

    return { mimeType, uri };
  }, [endpoint, props]);

  useEffect(() => {
    if (!window?.document) return;

    const video = videoRef.current;
    const videoContainer = videoContainerRef.current;

    const player = new shaka.Player(video);

    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    const controls = ui.getControls();

    console.log(controls);

    getVideoData()
      .then((data) => {
        player
          .load(data.uri, 0, data.mimeType)
          .then(function () {
            console.log(player);
          })
          .catch((err: Error) => {
            console.error(err);
          });
      })
      .catch(() => {
        props.callbackOnVideoNotExists();
      });
  }, [videoRef, videoContainerRef, props, endpoint, getVideoData]);

  return (
    <div ref={videoContainerRef} className="mx-auto max-w-full w-[800px]">
      <video className="w-full h-full" ref={videoRef}></video>
    </div>
  );
}
