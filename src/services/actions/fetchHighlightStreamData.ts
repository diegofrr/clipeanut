'use client';

import type { IStream, IPipedInstance } from '@/types';
import { streamData } from '@/mocks';
import { getCachedHighligthtStream, saveCachedHighlightStream } from './LocalStorage/cachedHighlightStreams';

import { DEFAULT_VALUES } from '@/constants';

interface IFetchHighlightStreamProps {
  options: FetchHighlightStreamOptionsType;
}

export type FetchHighlightStreamOptionsType = {
  streamId: string;
  instance: IPipedInstance;
  isFake?: boolean;
  delay?: number;
};

let controller: AbortController;

export async function fetchHighlightStream({ options }: IFetchHighlightStreamProps): Promise<IStream> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchHighlightStreamOptionsType): Promise<IStream> {
  if (controller) controller.abort();
  controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), 5000);
  const cachedData = getCachedHighligthtStream(options.streamId);
  if (cachedData.id) return cachedData as unknown as IStream;

  return fetch(`${options.instance.api_url}/streams/${options.streamId}`, {
    cache: 'no-cache',
    signal: controller.signal
  })
    .then((res) => res.json())
    .then((data) => {
      saveCachedHighlightStream(data);
      return data as IStream;
    })
    .finally(() => clearTimeout(timeout));
}

async function fetchFakeData(delay?: number): Promise<IStream> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(streamData as IStream);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
