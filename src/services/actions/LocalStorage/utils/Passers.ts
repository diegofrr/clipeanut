import type { IFavoriteStream, IStream, ITrendingVideo } from '@/types';

function streamDataToFavoriteStream(data: IStream): IFavoriteStream {
  return {
    id: '',
    type: 'video',
    isShort: false,
    duration: data.duration,
    thumbnail: data.thumbnailUrl,
    title: data.title,
    uploaderAvatar: data.uploaderAvatar,
    uploaderName: data.uploader,
    uploaderUrl: data.uploaderUrl
  } as IFavoriteStream;
}

function trendingVideoToFavoriteStream(data: ITrendingVideo): IFavoriteStream {
  return {
    id: '',
    type: 'video',
    isShort: false,
    duration: data.duration,
    thumbnail: data.thumbnail,
    title: data.title,
    uploaderAvatar: data.uploaderAvatar,
    uploaderName: data.uploaderName,
    uploaderUrl: data.uploaderUrl
  } as IFavoriteStream;
}

export const localStoragePassers = {
  streamDataToFavoriteStream,
  trendingVideoToFavoriteStream
};
