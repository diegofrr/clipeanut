'use client';

import { createRef, useCallback, useContext, useEffect, useState } from 'react';
import { StreamContext } from '../contexts/stream';

import { FetchStreamOptionsType, fetchStream } from '@/services/actions/fetchStreamData';
import { ShakaUtils } from '@/utils';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { VideoPlayerLoading } from './VideoPlayerLoading';
import { VideoPlayerError } from './VideoPlayerError';
import { isFakeDataFetch } from '@/environments';

import { DEFAULT_VALUES, PIPED_VALUES, WATCH_PAGE_VALUES } from '@/constants';
const { INITIAL_STATE } = WATCH_PAGE_VALUES.VIDEO_PLAYER;

export default function VideoPlayerContent() {
  const { setStream, streamId } = useContext(StreamContext);
  const { instance } = useContext(PipedInstanceContext);

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(INITIAL_STATE.isVideoLoaded);
  const [canRetry, setCanRetry] = useState<boolean>(INITIAL_STATE.canRetry);
  const [successFetch, setSuccessFetch] = useState(false);

  const videoRef = createRef<HTMLVideoElement>();
  const videoContainerRef = createRef<HTMLDivElement>();

  const getStreamData = useCallback(async () => {
    const streamFormats = [];
    let mimeType = '';
    let uri = '';

    const options = { streamId, instance, isFake: isFakeDataFetch, delay: 1 } as FetchStreamOptionsType;

    const stream = await fetchStream({ options });
    setSuccessFetch(!!stream);

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
      const dash = await ShakaUtils.generateDashFileFromFormats(streamFormats, stream.duration);
      uri = PIPED_VALUES.VIDEO_TYPES.DASH_XML_DATA_URI + btoa(dash);
      mimeType = PIPED_VALUES.VIDEO_TYPES.DASH_XML_VIDEO_TYPE;
    }

    return { mimeType, uri, stream };
  }, [instance, streamId]);

  async function boundLoadPlayer() {
    const VIDEO_START_TIME = 0;
    let MAX_LOAD_ATTEMPTS = 5;
    const { mimeType, uri, stream } = await getStreamData();

    const shaka = (await import('@/lib/ShakaPlayer/shaka-player')).default;

    async function loadPlayer() {
      const videoElement = videoRef.current;
      const videoContainer = videoContainerRef.current;

      try {
        const player = new shaka.Player(videoElement);
        const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);
        ui.getControls();

        player
          .load(uri, VIDEO_START_TIME, mimeType)
          .then(function () {
            setStream(stream);
            setIsVideoLoaded(true);
            videoElement?.setAttribute('poster', stream.thumbnailUrl);
          })
          .catch((err: Error) => {
            setCanRetry(true);
            console.error(err);
            if (MAX_LOAD_ATTEMPTS > 0) loadPlayer();
          })
          .finally(() => {
            MAX_LOAD_ATTEMPTS--;
          });
      } catch {
        /* empty */
      }
    }
    loadPlayer();
  }

  useEffect(() => {
    if (window?.document) boundLoadPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successFetch]);

  return (
    <>
      {!isVideoLoaded && !canRetry && <VideoPlayerLoading />}

      <div
        ref={videoContainerRef}
        className={`${(!isVideoLoaded || canRetry) && 'shaka-hidden'} mx-auto max-w-full w-full relative`}
      >
        <video className="w-full h-full rounded-lg overflow-hidden" ref={videoRef}></video>
      </div>

      {canRetry && <VideoPlayerError />}
    </>
  );
}
