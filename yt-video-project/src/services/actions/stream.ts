import streamData from '@/mocks/streamData';
import IStream from '@/types/Stream';

import { DEFAULT_VALUES } from '@/constants';

interface IStreamProps {
  options: OptionsStream;
}

export type OptionsStream = {
  videoId: string;
  endpoint: string;
  isFake?: boolean;
  delay?: number;
};

export async function getStream({ options }: IStreamProps): Promise<IStream> {
  return options.isFake ? _getStreamData(options.delay) : getStreamData(options);
}

export async function getStreamData(options: OptionsStream): Promise<IStream> {
  return fetch(`${options.endpoint}/streams/${options.videoId}`)
    .then((res) => res.json())
    .then((data) => data as IStream);
}

export async function _getStreamData(delay?: number): Promise<IStream> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(streamData as IStream);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
