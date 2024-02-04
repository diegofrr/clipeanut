import { Skeleton } from '@nextui-org/react';

export default function TrendingVideosSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => (
    <div key={index} className="flex flex-col items-center justify-start gap-4 w-full">
      <Skeleton className="w-full h-96 md:h-48 mid-lg:h-60 lg:h-48 xl:h-60 sm:rounded-lg" />
      <div className="flex flex-row gap-4 w-full px-6 sm:p-0">
        <Skeleton className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="w-1/2 h-2 rounded-full" />
          <Skeleton className="w-full h-3 rounded-full" />
          <Skeleton className="w-1/2 h-3 rounded-full" />
        </div>
      </div>
    </div>
  ));
}
