import Link from 'next/link';
import { Avatar, Chip, Image } from '@nextui-org/react';

import type { ITrendingVideo } from '@/types';
import { StreamUtils } from '@/utils';
import { IconCircleCheckFilled, IconClock, IconEye } from '@tabler/icons-react';
import { createRef } from 'react';

type TrendingVideoProps = React.HTMLAttributes<HTMLElement> & {
  data: ITrendingVideo;
};

export const TrendingVideo = ({ data, ...props }: TrendingVideoProps) => {
  const avatarRef = createRef<HTMLSpanElement>();

  function onLoadAvatarError() {
    const img = avatarRef?.current?.querySelector('img') as HTMLImageElement;
    img.src = data.uploaderAvatar;
    img.style.opacity = '1';
  }

  return (
    <div {...props}>
      <div
        title={data.title}
        className="group/container transition-colors flex flex-col items-center justify-start gap-4 w-full"
      >
        <div className="flex items-center overflow-hidden justify-center bg-neutral-950 w-full relative rounded-none sm:rounded-lg">
          <Link href={data.url}>
            <Image
              // src={`https://i.ytimg.com/vi/${data.url.split('v=')[1]}/mqdefault.jpg`}
              src={data.thumbnail}
              alt={data.title}
              width={720}
              height={480}
              loading="lazy"
              className="group-hover/container:scale-105 transition-transform rounded-none sm:rounded-lg"
            />
            <div className="absolute bottom-2 right-2 bg-dark flex flex-row rounded-full overflow-hidden">
              <Chip
                size="sm"
                radius="none"
                startContent={<IconEye size={16} className="mr-1" />}
                className="text-white bg-black px-2 z-10 border-r-1 border-neutral-800"
              >
                {StreamUtils.formatStreamStats(data.views)}
              </Chip>

              <Chip
                size="sm"
                radius="none"
                startContent={<IconClock size={16} className="mr-1" />}
                className="text-white bg-black px-2 z-10"
              >
                {StreamUtils.formatStreamDuration(data.duration)}
              </Chip>
            </div>
          </Link>
        </div>

        <footer className="flex flex-row gap-4 w-full relative px-6 sm:p-0">
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full">
            <Avatar
              ref={avatarRef}
              name={data.uploaderName}
              src={StreamUtils.channelImagemUrlGenerator(data.uploaderAvatar)}
              onError={onLoadAvatarError}
            />
            {data.uploaderVerified && (
              <IconCircleCheckFilled
                size={18}
                className="absolute rounded-full p-[1px] bottom-[-2px] right-[-2px] bg-background text-app_orange-600"
              />
            )}
          </div>
          <div className="flex w-full flex-col">
            <span className="text-xs text-gray-800 dark:text-gray-300 mb-1 inline-flex">
              {data.uploaderName} <span className="mx-2 leading-normal text-[9px]">•</span>
              {StreamUtils.translateUploadedDate(data.uploadedDate)}
            </span>
            <Link href={data.url}>
              <p className="text-base text-black dark:text-white font-bold line-clamp-2 h-auto overflow-hidden">
                {data.title}
              </p>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};
