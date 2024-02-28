'use server';

import type { ISearchResultRoot, IPipedInstance } from '@/types';
import { searchResults } from '@/mocks';

import { DEFAULT_VALUES } from '@/constants';

interface IFetchSearchRestultsProps {
  options: FetchSearchResultsOptionsType;
}

export type FetchSearchResultsOptionsType = {
  query: string;
  filter?: string;
  instance: IPipedInstance;
  isFake?: boolean;
  delay?: number;
};

export async function fetchSearchResults({ options }: IFetchSearchRestultsProps): Promise<ISearchResultRoot> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchSearchResultsOptionsType): Promise<ISearchResultRoot> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const filter = options.filter || 'all';

  return fetch(`${options.instance.api_url}/search?q=${options.query}&filter=${filter}`, {
    signal: controller.signal
  })
    .then((res) => res.json())
    .then((data) => data as ISearchResultRoot)
    .finally(() => clearTimeout(timeout));
}

async function fetchFakeData(delay?: number): Promise<ISearchResultRoot> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(searchResults as ISearchResultRoot);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
