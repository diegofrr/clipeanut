import { ITrendingVideo } from '@/types';

export interface ICachedTrendingVideos {
  lastUpdate: string;
  regionList: IRegion[];
}

interface IRegion {
  region: string;
  data: ITrendingVideo[];
}
