import { ITrendingVideo } from '@/types';

export interface ICachedTrendingVideos {
  lastUpdate: string;
  regionList: IRegion[];
}

export interface ICachedPipedInstance {
  name: string;
  api_url: string;
}

export interface ICachedHighligthStream {
  id: string;
  thumbnailUrl: string;
  description: string;
  type: string;
  isShort: boolean;
  title: string;
  uploaderName: string;
  uploaderUrl: string;
  uploaderAvatar: string;
}

interface IRegion {
  region: string;
  data: ITrendingVideo[];
}
