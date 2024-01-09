import Image from 'next/image';
import Link from 'next/link';

import ITrendingVideo from '@/types/TrendingVideo';

import { Chip } from '@nextui-org/react';
import { formatters } from '@/utils';
import { IconEye } from '@tabler/icons-react';

import { HOME_PAGE_VALUES } from '@/constants';
const { TRENDING_VIDEO } = HOME_PAGE_VALUES;

export const TrendingVideo = ({ data }: { data: ITrendingVideo }) => {
  function abbrevTitle(title: string) {
    if (title.length > TRENDING_VIDEO.TITLE_MAX_LENGTH) {
      return title.slice(0, TRENDING_VIDEO.TITLE_MAX_LENGTH) + '...';
    } else return title;
  }

  return (
    <Link href={data.url}>
      <div
        title={data.title}
        className="group/container transition-colors cursor-pointer flex flex-col items-center justify-start lg:w-80 gap-2 w-full"
      >
        <div className="flex items-center overflow-hidden justify-center rounded-lg bg-neutral-950 w-full relative">
          <Image
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
