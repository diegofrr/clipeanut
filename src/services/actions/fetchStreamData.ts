'use server';

import type { IStream, IPipedInstance } from '@/types';
import { DEFAULT_VALUES } from '@/constants';
import { streamData } from '@/mocks';

interface IFetchStreamProps {
  options: FetchStreamOptionsType;
}

export type FetchStreamOptionsType = {
  streamId: string;
  instance: IPipedInstance;
  isFake?: boolean;
  delay?: number;
};

export async function fetchStream({ options }: IFetchStreamProps): Promise<IStream> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchStreamOptionsType): Promise<IStream> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  return fetch(`${options.instance.api_url}/streams/${options.streamId}`, {
    cache: 'no-cache',
    signal: controller.signal
  })
    .then((res) => res.json())
    .then((data) => data as IStream)
    .finally(() => clearTimeout(timeout));
}

async function fetchFakeData(delay?: number): Promise<IStream> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(streamData as IStream);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
