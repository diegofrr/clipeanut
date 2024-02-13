import { ITrendingVideo } from '@/types';

export enum ServerFile {
  DATA = 'data.json',
  TRENDING = 'trending.json',
  TRENDING_VIDEOS = 'trending-videos.json'
}

export type GetServerFileAction = GetServerDataFile | GetServerTrendingFile | GetServerTrendingVideosFile;
export type SetServerFileAction = SetServerDataFile | SetServerTrendingFile | SetServerTrendingVideosFile;

// Getters
export interface GetServerDataFile {
  file: ServerFile.DATA;
}

export interface GetServerTrendingFile {
  file: ServerFile.TRENDING;
}

export interface GetServerTrendingVideosFile {
  file: ServerFile.TRENDING_VIDEOS;
}

// Setters
export interface SetServerDataFile {
  file: ServerFile.DATA;
  newData: IDataFileOutput;
}

export interface SetServerTrendingFile {
  file: ServerFile.TRENDING;
  newData: ITrendingFileOutput;
}

export interface SetServerTrendingVideosFile {
  file: ServerFile.TRENDING_VIDEOS;
  newData: ITrendingVideosFileOutput;
}

// Output
export interface IDataFileOutput {
  title: string;
}

export interface ITrendingFileOutput {
  lastUpdate: string;
}

export interface ITrendingVideosFileOutput {
  lastUpdate: string;
  regionList: IRegion[];
}

interface IRegion {
  region: string;
  data: ITrendingVideo[];
}
