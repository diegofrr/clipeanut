import type { IFavoriteStream, IStream, ITrendingVideo } from '@/types';

type DataToFavoriteStreamProps = {
  stream?: IStream;
  trending?: ITrendingVideo;
};

function dataToFavoriteStream({ stream, trending }: DataToFavoriteStreamProps): IFavoriteStream {
  try {
    const data = stream ?? trending!;

    const thumbnail = stream?.thumbnailUrl ?? trending?.thumbnail;
    const uploaderName = stream?.uploader ?? trending?.uploaderName;
    const id = extractId(new URL(String(thumbnail)));

    return {
      id,
      type: 'video',
      isShort: false,
      duration: data.duration,
      thumbnail: thumbnail,
      title: data.title,
      uploaderName: uploaderName,
      uploaderAvatar: data.uploaderAvatar,
      uploaderUrl: data.uploaderUrl
    } as IFavoriteStream;
  } catch {
    return {} as IFavoriteStream;
  }
}

function extractId(url: URL): string {
  return url.pathname.split('/').reverse()[1];
}

export const localStoragePassers = {
  dataToFavoriteStream
};
