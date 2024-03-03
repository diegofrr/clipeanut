import type { ICachedHighligthStream, ICachedPipedInstance } from '../types';
import type { IFavoriteStream, IPipedInstance, IStream, ITrendingVideo } from '@/types';

import { extractId } from '.';

type DataToFavoriteStreamProps = {
  stream?: IStream;
  trending?: ITrendingVideo;
};

export function dataToFavoriteStream({ stream, trending }: DataToFavoriteStreamProps): IFavoriteStream {
  try {
    const data = stream ?? trending!;

    const thumbnail = stream?.thumbnailUrl ?? trending?.thumbnail;
    const uploaderName = stream?.uploader ?? trending?.uploaderName;
    const id = extractId(String(thumbnail));

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

export function instancesToCachedPipedInstances(data: IPipedInstance[]): ICachedPipedInstance[] {
  try {
    return data.map((item) => ({
      name: item.name,
      api_url: item.api_url
    })) as ICachedPipedInstance[];
  } catch {
    return [] as ICachedPipedInstance[];
  }
}

export function streamToCachedHighligthStream(stream: IStream) {
  const id = extractId(String(stream.thumbnailUrl));

  try {
    return {
      id,
      type: 'video',
      isShort: false,
      title: stream.title,
      description: stream.description,
      thumbnailUrl: stream.thumbnailUrl,
      uploaderAvatar: stream.uploaderAvatar,
      uploaderName: stream.uploader,
      uploaderUrl: stream.uploaderUrl
    } as ICachedHighligthStream;
  } catch {
    return {} as ICachedHighligthStream;
  }
}
