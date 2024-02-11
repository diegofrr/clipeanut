'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationEvents() {
  const pathname = usePathname();
  const [isWatchedVideo, setIsWatchedVideo] = useState(false);

  function stopWatchedVideoStream() {
    setIsWatchedVideo(false);

    if (window?.document) {
      const player = window.document.querySelector('#oplayer video') as HTMLVideoElement;
      player && player.pause();
    }
  }

  useEffect(() => {
    if (pathname === '/watch') setIsWatchedVideo(true);
    else if (isWatchedVideo) stopWatchedVideoStream();
  }, [pathname, isWatchedVideo]);

  return null;
}
