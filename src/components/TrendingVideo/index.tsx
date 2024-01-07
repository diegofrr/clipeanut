import ITrendingVideo from '@/types/TrendingVideo';
import Image from 'next/image';
import Link from 'next/link';

const MAX_TITLE_LENGTH = 50;

export const TrendingVideo = ({ data }: { data: ITrendingVideo }) => {
  function abbrevTitle(title: string) {
    if (title.length > MAX_TITLE_LENGTH) {
      return title.slice(0, MAX_TITLE_LENGTH) + '...';
    }
    return title;
  }

  return (
    <Link href={data.url}>
      <div
        title={data.title}
        className="group/container cursor-pointer flex flex-col items-center justify-start lg:w-80 sm:w-64 gap-2 w-screen max-w-lg"
      >
        <div className="rounded-lg bg-neutral-950 lg:w-80 lg:h-48 relative overflow-hidden sm:w-64 sm:h-36 w-full xs:h-72 xxs:h-60 h-48">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <Image
            src={data.uploaderAvatar}
            alt={data.uploaderName}
            width={40}
            height={40}
            className="max-w-[40px] max-h-[40px] rounded-full"
          />
          <footer className="flex flex-col w-full">
            <p className="group-hover/container:text-blue-400 text-base text-white mb-2 font-bold transition-all duration-[0.3s] ease-[ease]">
              {abbrevTitle(data.title)}
            </p>
            <span className="text-xs text-gray-400 mb-1">{data.uploaderName}</span>
            <span className="text-xs text-gray-400">{data.views} views</span>
          </footer>
        </div>
      </div>
    </Link>
  );
};
