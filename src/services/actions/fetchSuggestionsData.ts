'use server';

import type { Suggestions } from '@/types';

import { DEFAULT_VALUES } from '@/constants';
import { suggestionsData } from '@/mocks';

interface IFetchSuggestionsProps {
  options: FetchSuggestionsOptionsType;
}

export type FetchSuggestionsOptionsType = {
  query: string;
  isFake?: boolean;
  delay?: number;
};

export async function fetchSuggestions({ options }: IFetchSuggestionsProps): Promise<Suggestions> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchSuggestionsOptionsType): Promise<Suggestions> {
  return fetch(`https://pipedapi.kavin.rocks/opensearch/suggestions?query=${options.query}`)
    .then((res) => res.json())
    .then((data) => data as Suggestions);
}

async function fetchFakeData(delay?: number): Promise<Suggestions> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(suggestionsData as [string, string[]]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
