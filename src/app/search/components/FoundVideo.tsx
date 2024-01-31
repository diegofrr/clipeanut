import Link from 'next/link';

import Icons from '@/icons';

import type { ISearchResult } from '@/types';

import { Chip, Image } from '@nextui-org/react';
import { isFakeDataFetch } from '@/environments';
import { StreamUtils } from '@/utils';
import { createRef } from 'react';

type FoundVideoProps = React.HTMLAttributes<HTMLElement> & {
  data: ISearchResult;
};

export function FoundVideo({ data, ...props }: FoundVideoProps) {
  const thumbnailRef = createRef<HTMLImageElement>();

  function getStreamImage(type: 'thumbnail' | 'avatar') {
    if (type === 'avatar') return data.uploaderAvatar;
    else if (isFakeDataFetch) return data.thumbnail;
    else return `https://i.ytimg.com/vi/${data.url.split('v=')[1]}/mqdefault.jpg`;
  }

  function onLoadThumbnailError() {
    const img = thumbnailRef.current as HTMLImageElement;
    img.src = data.thumbnail;
    img.style.opacity = '1';
  }

  return (
    <div {...props}>
      <div className="group/container flex items-center overflow-hidden justify-center bg-neutral-950 w-full relative rounded-none sm:rounded-lg">
        <Link href={data?.url}>
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
            {data.views && (
              <Chip
                size="sm"
                radius="none"
                startContent={<Icons.Eye strokeWidth={2} size={14} className="mr-1" />}
                className="text-white bg-black px-2 border-r-1 border-neutral-800 rounded-l-full"
              >
                {StreamUtils.formatStreamStats(data.views)}
              </Chip>
            )}

            {data.duration && (
              <Chip
                size="sm"
                radius="none"
                startContent={<Icons.Clock strokeWidth={2} size={14} className="mr-1" />}
                className="text-white bg-black px-2 rounded-r-full"
              >
                {StreamUtils.formatStreamDuration(data.duration)}
              </Chip>
            )}
          </div>
        </Link>
      </div>
      <div></div>
    </div>
  );
}
