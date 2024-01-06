'use server';

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
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

export async function fetchData(options: OptionsStream): Promise<IStream> {
  return fetch(`${options.endpoint}/streams/${options.videoId}`)
    .then((res) => res.json())
    .then((data) => data as IStream);
}

export async function fetchFakeData(delay?: number): Promise<IStream> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(streamData as IStream);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
