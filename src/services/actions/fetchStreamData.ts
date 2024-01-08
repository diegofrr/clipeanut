'use server';

import streamData from '@/mocks/streamData';
import IStream from '@/types/Stream';

import { DEFAULT_VALUES } from '@/constants';

interface IFetchStreamProps {
  options: FetchStreamOptionsType;
}

export type FetchStreamOptionsType = {
  streamId: string;
  endpoint: string;
  isFake?: boolean;
  delay?: number;
};

export async function fetchStream({ options }: IFetchStreamProps): Promise<IStream> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchStreamOptionsType): Promise<IStream> {
  return fetch(`${options.endpoint}/streams/${options.streamId}`)
    .then((res) => res.json())
    .then((data) => data as IStream);
}

async function fetchFakeData(delay?: number): Promise<IStream> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(streamData as IStream);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
