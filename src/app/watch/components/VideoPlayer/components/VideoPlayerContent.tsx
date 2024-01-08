'use client';

import { createRef, useCallback, useContext, useEffect, useState } from 'react';

import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';
import { generateDashFileFromFormats } from '@/utils/DashGenerator';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';
import { StreamContext } from '../contexts/stream';

let boundLoadPlayer = () => {};

const INITIAL_STATE = {
  pipedInstanceList: PIPED_VALUES.INSTANCES,
  canHandleRetry: false
};

export default function VideoPlayerContent() {
  const { setStream, streamId } = useContext(StreamContext);
  const { endpoint, setInstance } = useContext(PipedInstanceContext);

  const [canHandleRetry, setCanHandleRetry] = useState<boolean>(INITIAL_STATE.canHandleRetry);
  const [pipedInstanceList, setPipedInstanceList] = useState<string[]>(INITIAL_STATE.pipedInstanceList);

  const videoRef = createRef<HTMLVideoElement>();
  const videoContainerRef = createRef<HTMLDivElement>();

  const getStreamData = useCallback(async () => {
    const streamFormats = [];
    let mimeType = '';
    let uri = '';

    const options = { streamId, endpoint, isFake: false, delay: 1 } as FetchStreamOptionsType;

    const stream = await fetchStream({ options });

    streamFormats.push(...stream.videoStreams);
    streamFormats.push(...stream.audioStreams);

    if (options.isFake) {
      uri = DEFAULT_VALUES.FAKE_VIDEO_URI;
      mimeType = PIPED_VALUES.VIDEO_TYPES.MP4_VIDEO_TYPE;
    } else if (stream.livestream) {
      uri = stream.hls;
      mimeType = PIPED_VALUES.VIDEO_TYPES.HLS_VIDEO_TYPE;
    } else if (stream.dash) {
      const url = new URL(stream.dash);
      url.searchParams.set('rewrite', 'false');
      uri = url.toString();
    } else {
      const dash = await generateDashFileFromFormats(streamFormats, stream.duration);
      uri = PIPED_VALUES.VIDEO_TYPES.DASH_XML_DATA_URI + btoa(dash);
      mimeType = PIPED_VALUES.VIDEO_TYPES.DASH_XML_VIDEO_TYPE;
    }

    return { mimeType, uri, stream };
  }, [endpoint, streamId]);

  const loadPlayer = useCallback(async () => {
    const VIDEO_START_TIME = 0;

    const shaka = (await import('@/lib/ShakaPlayer/shaka-player')).default;

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
            console.log('Video loaded!');
            setStream(stream);
            videoElement?.setAttribute('poster', stream.thumbnailUrl);
          })
          .catch(() => {
            boundLoadPlayer();
          });
      })
      .catch(() => {
        boundLoadPlayer();
      });
  }, [getStreamData, videoContainerRef, videoRef, setStream]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function handleLoadPlayerRetry() {
  //   setPipedInstanceList(PIPED_VALUES.INSTANCES);
  //   boundLoadPlayer();
  // }

  return (
    <>
      <div ref={videoContainerRef} className="mx-auto max-w-full w-full rounded-lg overflow-hidden">
        <video className="w-full h-full" ref={videoRef}></video>
      </div>
      {canHandleRetry && <span className="text-red-500 text-center">Algo saiu errado :(</span>}
    </>
  );
}
