export enum ServerFile {
  DATA = 'data.json',
  TRENDING = 'trending.json'
}

export type GetServerFileAction = GetServerDataFile | GetServerTrendingFile;
export type SetServerFileAction = SetServerDataFile | SetServerTrendingFile;

export interface GetServerDataFile {
  file: ServerFile.DATA;
}

export interface GetServerTrendingFile {
  file: ServerFile.TRENDING;
}

export interface SetServerDataFile {
  file: ServerFile.DATA;
  newData: IDataFileOutput;
}

export interface SetServerTrendingFile {
  file: ServerFile.TRENDING;
  newData: ITrendingFileOutput;
}

export interface IDataFileOutput {
  title: string;
}

export interface ITrendingFileOutput {
  lastUpdate: string;
}
