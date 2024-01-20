'use client';

import CustomSpinner from '@/components/CustomSpinner';

import { ITrendingVideo } from '@/types';
import { TrendingVideo } from './components/Video';

type TrendingVideosProps = {
  data: ITrendingVideo[];
  isLoading?: boolean;
  isHidden?: boolean;
};

export default function TrendingVideos({ data, isLoading, isHidden }: TrendingVideosProps) {
  return (
    <div
      className={`grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 justify-items-center
      ${isHidden ? 'hidden' : ''}`}
    >
      {isLoading && <CustomSpinner stroke="md" className="absolute" />}
      {!isLoading && data.length > 0 && (
        <>
          {data.map((video, index) => (
            <TrendingVideo key={index} data={video} />
          ))}
        </>
      )}
    </div>
  );
}
