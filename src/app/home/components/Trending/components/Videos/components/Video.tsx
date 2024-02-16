import Link from 'next/link';
import { createRef } from 'react';

import Icons from '@/icons';

import type { ITrendingVideo } from '@/types';

import { StreamUtils } from '@/utils';
import { isFakeDataFetch } from '@/environments';
import { Avatar, Chip, Image } from '@nextui-org/react';
import { VideoMenuDropdown } from './VideoMenuDropdown';

type TrendingVideoProps = React.HTMLAttributes<HTMLElement> & {
  data: ITrendingVideo;
};

export function TrendingVideo({ data, ...props }: TrendingVideoProps) {
  const thumbnailRef = createRef<HTMLImageElement>();

  function onLoadThumbnailError() {
    const img = thumbnailRef.current as HTMLImageElement;
    img.src = data.thumbnail;
    img.style.opacity = '1';
  }

  function getStreamImage(type: 'thumbnail' | 'avatar') {
    if (type === 'avatar') return data.uploaderAvatar;
    else if (isFakeDataFetch) return data.thumbnail;
    else return `https://i.ytimg.com/vi/${data.url.split('v=')[1]}/mqdefault.jpg`;
  }

  return (
    <div {...props}>
      <div title={data.title} className="transition-colors flex flex-col items-center justify-start gap-4 w-full">
        <div className="group/container flex items-center overflow-hidden justify-center bg-neutral-950 w-full relative rounded-none sm:rounded-lg">
          <Link href={data.url}>
            <Image
              src={getStreamImage('thumbnail')}
              ref={thumbnailRef}
              onError={onLoadThumbnailError}
              alt={data.title}
              width={720}
              height={480}
              loading="lazy"
              className="group-hover/container:scale-105 transition-transform rounded-none sm:rounded-lg"
            />
            <div className="absolute bottom-2 right-2 bg-dark flex flex-row z-10 items-center">
              <Chip
                size="sm"
                radius="none"
                startContent={<Icons.Eye strokeWidth={2} size={14} className="mr-1" />}
                className="text-white bg-black px-2 border-r-1 border-neutral-800 rounded-l-full"
              >
                {StreamUtils.formatStreamStats(data.views)}
              </Chip>

              <Chip
                size="sm"
                radius="none"
                startContent={<Icons.Clock strokeWidth={2} size={14} className="mr-1" />}
                className="text-white bg-black px-2 rounded-r-full"
              >
                {StreamUtils.formatStreamDuration(data.duration)}
              </Chip>
            </div>
          </Link>
        </div>

        <footer className="flex flex-row gap-4 w-full relative px-6 sm:p-0">
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full">
            <Avatar name={data.uploaderName} src={getStreamImage('avatar')} />
            {data.uploaderVerified && (
              <Icons.VerifiedSolid
                size={18}
                className="absolute rounded-full p-[1px] bottom-[-2px] right-[-2px] bg-background text-app_orange-600"
              />
            )}
          </div>

          <div className="flex w-full flex-col">
            <div className="text-xs text-gray-800 dark:text-gray-300 mb-1 inline-flexowrap">
              <p className="break-all">
                {data.uploaderName}
                <span className="mx-2 leading-normal text-[9px]">•</span>
                <span>{StreamUtils.translateUploadedDate(data.uploadedDate)}</span>
              </p>
            </div>

            <Link href={data.url}>
              <p className="text-base break-all text-black dark:text-white font-bold line-clamp-2 h-auto overflow-hidden">
                {data.title}
              </p>
            </Link>
          </div>

          <VideoMenuDropdown video={data} />
        </footer>
      </div>
    </div>
  );
}
