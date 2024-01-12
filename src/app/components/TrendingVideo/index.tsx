import Link from 'next/link';
import { Chip, Image } from '@nextui-org/react';

import type { ITrendingVideo } from '@/types';
import { StreamUtils } from '@/utils';
import { IconEye } from '@tabler/icons-react';

type TrendingVideoProps = {
  data: ITrendingVideo;
};

export const TrendingVideo = ({ data }: TrendingVideoProps) => {
  function onImageLoaderError() {
    console.log('Image error');
  }

  return (
    <Link href={data.url}>
      <div
        title={data.title}
        className="group/container transition-colors cursor-pointer flex flex-col items-center justify-start gap-4 w-full"
      >
        <div className="flex items-center overflow-hidden justify-center bg-neutral-950 w-full relative">
          <Image
            onError={onImageLoaderError}
            src={`https://i.ytimg.com/vi/${data.url.split('v=')[1]}/mqdefault.jpg`}
            alt={data.title}
            width={720}
            height={480}
            loading="lazy"
            className="group-hover/container:scale-105 transition-transform rounded-none sm:rounded-lg"
          />
          <Chip
            size="sm"
            radius="full"
            startContent={<IconEye size={16} className="mr-1" />}
            className="absolute bottom-2 right-2 bg-dark text-white bg-black px-2 z-10"
          >
            {StreamUtils.formatStreamStats(data.views)}
          </Chip>
        </div>

        <footer className="flex flex-row gap-4 w-full relative px-6 sm:p-0">
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={StreamUtils.channelImagemUrlGenerator(data.uploaderAvatar)}
              alt={data.uploaderName + ' avatar'}
              width={40}
              height={40}
              className="h-10 w-10 min-w-10 min-h-10"
            />
          </div>
          <div className="flex w-full flex-col">
            <span className="text-xs text-gray-800 dark:text-gray-300 mb-1">
              {data.uploaderName} <span className="mx-1">•</span> {StreamUtils.translateUploadedDate(data.uploadedDate)}
            </span>
            <p className="text-base text-black dark:text-white font-bold line-clamp-2 h-auto overflow-hidden">
              {data.title}
            </p>
          </div>
        </footer>
      </div>
    </Link>
  );
};
