import ITrendingVideo from '@/types/TrendingVideo';

export const TrendingVideo = (data: ITrendingVideo) => {
  return (
    <div className="bg-red-200">
      <p className="text-2xl text-gray-400 font-bold">{data.title}</p>
    </div>
  );
};
