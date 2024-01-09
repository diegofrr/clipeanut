import Image from 'next/image';
import Link from 'next/link';

import ITrendingVideo from '@/types/TrendingVideo';

import { Chip } from '@nextui-org/react';
import { formatters } from '@/utils';
import { IconEye } from '@tabler/icons-react';

const MAX_TITLE_LENGTH = 50;

export const TrendingVideo = ({ data }: { data: ITrendingVideo }) => {
  function abbrevTitle(title: string) {
    return title.length > MAX_TITLE_LENGTH ? title.slice(0, MAX_TITLE_LENGTH) + '...' : title;
  }

  return (
    <Link href={data.url} className="rounded-lg p-4 transition-colors">
      <div
        title={data.title}
        className="group/container transition-colors cursor-pointer flex flex-col items-center justify-start lg:w-80 sm:w-64 gap-2 w-screen max-w-lg"
      >
        <div className="rounded-lg bg-neutral-950 lg:w-80 lg:h-48 relative overflow-hidden sm:w-64 sm:h-36 w-full xs:h-72 xxs:h-60 h-48">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="group-hover/container:scale-105 transition-transform"
          />
          <Chip
            size="sm"
            radius="full"
            startContent={<IconEye size={16} />}
            className="absolute bottom-2 right-2 bg-dark text-white bg-black"
          >
            {formatters.streamViews(data.views)}
          </Chip>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <Image
            src={data.uploaderAvatar}
            alt={data.uploaderName}
            width={40}
            height={40}
            className="max-w-[40px] max-h-[40px] rounded-full"
          />
          <footer className="flex w-full flex-col">
            <span className="text-xs text-gray-800 dark:text-gray-300 mb-1">{data.uploaderName}</span>
            <p className="text-base text-black dark:text-white font-bold transition-colors">
              {abbrevTitle(data.title)}
            </p>
          </footer>
        </div>
      </div>
    </Link>
  );
};
