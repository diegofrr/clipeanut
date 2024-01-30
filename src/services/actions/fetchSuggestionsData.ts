'use server';

import type { IPipedInstance, Suggestions } from '@/types';

import { DEFAULT_VALUES } from '@/constants';
import { suggestionsData } from '@/mocks';

interface IFetchSuggestionsProps {
  options: FetchSuggestionsOptionsType;
}

export type FetchSuggestionsOptionsType = {
  instance: IPipedInstance;
  query: string;
  isFake?: boolean;
  delay?: number;
};

export async function fetchSuggestions({ options }: IFetchSuggestionsProps): Promise<Suggestions> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchSuggestionsOptionsType): Promise<Suggestions> {
  return fetch(`${options.instance.api_url}/opensearch/suggestions?query=${options.query}`)
    .then((res) => res.json())
    .then((data) => data as Suggestions)
    .catch(() => ({}) as Suggestions);
}

async function fetchFakeData(delay?: number): Promise<Suggestions> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(suggestionsData as [string, string[]]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
