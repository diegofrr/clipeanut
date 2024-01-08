'use client';

import { createRef, useCallback, useContext, useEffect, useState } from 'react';
import { StreamContext } from '../contexts/stream';
import { LoadingVideo } from './LoadingVideo';

import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';
import { generateDashFileFromFormats } from '@/utils/DashGenerator';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';
import { ErrorOnLoadVideo } from './ErrorOnLoadVideo';

let boundLoadPlayer = () => {};

const INITIAL_STATE = {
  pipedInstanceList: PIPED_VALUES.INSTANCES,
  isVideoLoaded: false,
  canRetry: false
};

export default function VideoPlayerContent() {
  const { setStream, streamId } = useContext(StreamContext);
  const { endpoint, setInstance, instance } = useContext(PipedInstanceContext);

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(INITIAL_STATE.isVideoLoaded);
  const [canRetry, setCanRetry] = useState<boolean>(INITIAL_STATE.canRetry);
  const [pipedInstanceList, setPipedInstanceList] = useState<string[]>(INITIAL_STATE.pipedInstanceList);

  const videoRef = createRef<HTMLVideoElement>();
  const videoContainerRef = createRef<HTMLDivElement>();

  const getStreamData = useCallback(async () => {
    const streamFormats = [];
    let mimeType = '';
    let uri = '';

    const options = { streamId, endpoint, isFake: true, delay: 1 } as FetchStreamOptionsType;

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
    let videoElement = {} as HTMLVideoElement | null;
    let videoContainer = {} as HTMLDivElement | null;
    let player = {} as shaka.Player;
    let ui;

    const shaka = (await import('@/lib/ShakaPlayer/shaka-player')).default;

    try {
      videoElement = videoRef.current;
      videoContainer = videoContainerRef.current;
      player = new shaka.Player(videoElement);
      ui = new shaka.ui.Overlay(player, videoContainer, videoElement);
      ui.getControls();
    } catch {
      /* empty */
    }

    getStreamData()
      .then(({ mimeType, uri, stream }) => {
        player
          .load(uri, VIDEO_START_TIME, mimeType)
          .then(function () {
            setStream(stream);
            setIsVideoLoaded(true);
            setPipedInstanceList(PIPED_VALUES.INSTANCES);
            setInstance(instance);
            videoElement?.setAttribute('poster', stream.thumbnailUrl);
          })
          .catch(() => {
            boundLoadPlayer();
          });
      })
      .catch(() => {
        boundLoadPlayer();
      });
  }, [getStreamData, videoContainerRef, videoRef, setStream, setInstance, instance]);

  boundLoadPlayer = useCallback(() => {
    if (pipedInstanceList.length > 0) {
      setIsVideoLoaded(false);
      setCanRetry(false);
      setInstance(pipedInstanceList[0]);
      setPipedInstanceList(pipedInstanceList.slice(1));
      loadPlayer();
    } else setCanRetry(true);
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
      {!isVideoLoaded && !canRetry && <LoadingVideo />}

      <div
        ref={videoContainerRef}
        className={`${
          (!isVideoLoaded || canRetry) && 'shaka-hidden'
        } mx-auto max-w-full w-full rounded-lg overflow-hidden`}
      >
        <video className="w-full h-full" ref={videoRef}></video>
      </div>

      {canRetry && <ErrorOnLoadVideo />}
    </>
  );
}
