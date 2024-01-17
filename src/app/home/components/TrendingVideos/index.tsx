'use client';

import CustomSpinner from '@/components/CustomSpinner';

import { ITrendingVideo } from '@/types';
import { TrendingVideo } from './components/Video';

type TrendingVideosProps = {
  data: ITrendingVideo[];
  isLoading?: boolean;
};

export default function TrendingVideos({ data, isLoading }: TrendingVideosProps) {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 justify-items-center">
      {isLoading && <CustomSpinner size="lg" stroke="md" className="absolute" />}
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
