import ITrendingVideo from '@/types/TrendingVideo';
import Image from 'next/image';

export const TrendingVideo = ({ data }: { data: ITrendingVideo }) => {
  return (
    <div className="group/container cursor-pointer flex flex-col items-center justify-center w-80 gap-2">
      <div className="rounded-lg w-80 h-48 relative overflow-hidden">
        <Image
          src={data.thumbnail}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
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
            {data.title}
          </p>
          <span className="text-xs text-gray-400 mb-1">
            {data.uploaderName}
          </span>
          <span className="text-xs text-gray-400">{data.views} views</span>
        </footer>
      </div>
    </div>
  );
};
