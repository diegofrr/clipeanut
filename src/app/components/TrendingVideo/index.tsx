import Link from 'next/link';

import ITrendingVideo from '@/types/TrendingVideo';

import { Chip, Image } from '@nextui-org/react';
import { formatters, translateUploadedDate } from '@/utils';
import { IconEye } from '@tabler/icons-react';

export const TrendingVideo = ({ data }: { data: ITrendingVideo }) => {
  return (
    <Link href={data.url}>
      <div
        title={data.title}
        className="group/container transition-colors cursor-pointer flex flex-col items-center justify-start gap-4 w-full"
      >
        <div className="flex items-center overflow-hidden justify-center rounded-lg bg-neutral-950 w-full relative">
          <Image
            isBlurred
            src={data.thumbnail}
            alt={data.title}
            width={720}
            height={480}
            loading="lazy"
            className="group-hover/container:scale-105 transition-transform"
          />
          <Chip
            size="sm"
            radius="full"
            startContent={<IconEye size={16} className="mr-1" />}
            className="absolute bottom-2 right-2 bg-dark text-white bg-black px-2"
          >
            {formatters.streamViews(data.views)}
          </Chip>
        </div>
        <div className="flex flex-row gap-4 w-full relative">
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={data.uploaderAvatar}
              alt={data.uploaderName + ' avatar'}
              width={40}
              height={40}
              className="h-10 w-10 min-w-10 min-h-10"
            />
          </div>
          <footer className="flex w-full flex-col">
            <span className="text-xs text-gray-800 dark:text-gray-300 mb-1">
              {data.uploaderName} <span className="mx-1">•</span> {translateUploadedDate(data.uploadedDate)}
            </span>
            <p className="text-base text-black dark:text-white font-bold line-clamp-2 h-auto overflow-hidden">
              {data.title}
            </p>
          </footer>
        </div>
      </div>
    </Link>
  );
};
