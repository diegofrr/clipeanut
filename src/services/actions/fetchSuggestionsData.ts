'use server';

import type { IPipedInstance, ISuggestions } from '@/types';

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

let controller: AbortController;

export async function fetchSuggestions({ options }: IFetchSuggestionsProps): Promise<ISuggestions> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData(options);
}

async function fetchData(options: FetchSuggestionsOptionsType): Promise<ISuggestions> {
  if (controller) controller.abort();
  controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), 5000);

  return fetch(`${options.instance.api_url}/opensearch/suggestions?query=${options.query}`, {
    signal: controller.signal
  })
    .then((res) => res.json())
    .then((data) => data as ISuggestions)
    .finally(() => clearTimeout(timeout));
}

async function fetchFakeData(delay?: number): Promise<ISuggestions> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(suggestionsData as [string, string[]]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
