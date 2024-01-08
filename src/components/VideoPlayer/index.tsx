'use client';

import { createRef, useCallback, useContext, useEffect, useState } from 'react';

import shaka from '@/lib/ShakaPlayer/shaka-player';

import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';
import { generateDashFileFromFormats } from '@/utils/DashGenerator';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';
import { Button } from '@nextui-org/react';

let boundLoadPlayer = () => {};

interface IVideoPlayerProps {
  videoId: string;
  onFailure?: () => void;
  onSuccess?: () => void;
}

const INITIAL_STATE = {
  pipedInstanceList: PIPED_VALUES.INSTANCES,
  canHandleRetry: false
};

export default function VideoPlayer(props: IVideoPlayerProps) {
  const { endpoint, setInstance } = useContext(PipedInstanceContext);

  const [canHandleRetry, setCanHandleRetry] = useState<boolean>(INITIAL_STATE.canHandleRetry);
  const [pipedInstanceList, setPipedInstanceList] = useState<string[]>(INITIAL_STATE.pipedInstanceList);

  const videoRef = createRef<HTMLVideoElement>();
  const videoContainerRef = createRef<HTMLDivElement>();

  const getStreamData = useCallback(async () => {
    const { videoId } = props;
    const streamFormats = [];
    let mimeType = '';
    let uri = '';

    const options = { videoId, endpoint, isFake: true, delay: 1 } as FetchStreamOptionsType;

    const stream = await fetchStream({ options });

    streamFormats.push(...stream.videoStreams);
    streamFormats.push(...stream.audioStreams);

    if (options.isFake) {
      uri = DEFAULT_VALUES.FAKE_VIDEO_URI;
      mimeType = PIPED_VALUES.VIDEO_TYPES.MP4_VIDEO_TYPE;
    } else {
      if (stream.livestream) {
        uri = stream.hls;
        mimeType = PIPED_VALUES.VIDEO_TYPES.HLS_VIDEO_TYPE;
      } else {
        if (stream.dash) {
          const url = new URL(stream.dash);
          url.searchParams.set('rewrite', 'false');
          uri = url.toString();
        } else {
          const dash = await generateDashFileFromFormats(streamFormats, stream.duration);
          uri = PIPED_VALUES.VIDEO_TYPES.DASH_XML_DATA_URI + btoa(dash);
          mimeType = PIPED_VALUES.VIDEO_TYPES.DASH_XML_VIDEO_TYPE;
        }
      }
    }

    return { mimeType, uri, stream };
  }, [endpoint, props]);

  const loadPlayer = useCallback(async () => {
    const VIDEO_START_TIME = 0;

    const { onFailure, onSuccess } = props;
    const videoElement = videoRef.current;
    const videoContainer = videoContainerRef.current;
    const player = new shaka.Player(videoElement);
    const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);
    ui.getControls();

    getStreamData()
      .then(({ mimeType, uri, stream }) => {
        player
          .load(uri, VIDEO_START_TIME, mimeType)
          .then(function () {
            videoElement?.setAttribute('poster', stream.thumbnailUrl);
            onSuccess && onSuccess();
          })
          .catch(() => {
            onFailure && onFailure();
            boundLoadPlayer();
          });
      })
      .catch(() => {});
  }, [getStreamData, props, videoContainerRef, videoRef]);

  boundLoadPlayer = useCallback(() => {
    if (pipedInstanceList.length > 0) {
      setCanHandleRetry(false);
      setInstance(pipedInstanceList[0]);
      setPipedInstanceList(pipedInstanceList.slice(1));
      console.log('Piped Instances:', pipedInstanceList);
      loadPlayer();
    } else setCanHandleRetry(true);
  }, [loadPlayer, setInstance, pipedInstanceList]);

  useEffect(() => {
    if (window?.document) loadPlayer();
  }, [loadPlayer]);

  function handleLoadPlayerRetry() {
    setPipedInstanceList(PIPED_VALUES.INSTANCES);
    boundLoadPlayer();
  }

  return (
    <div>
      <div ref={videoContainerRef} className="mx-auto max-w-full w-[800px]">
        <video className="w-full h-full" ref={videoRef}></video>
      </div>
      {canHandleRetry && <Button onClick={handleLoadPlayerRetry}>Tentar novamente</Button>}
    </div>
  );
}
