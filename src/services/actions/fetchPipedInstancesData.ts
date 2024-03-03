'use server';

import type { IPipedInstance } from '@/types';
import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';
import { pipedInstancesData } from '@/mocks';
import { saveCachedPipedInstances } from './LocalStorage/cachedPipedInstances';

interface IFetchPipedInstancesData {
  options: FetchPipedInstancesOptionsType;
}

export type FetchPipedInstancesOptionsType = {
  isFake?: boolean;
  delay?: number;
};

export async function fetchPipedInstancesData({ options }: IFetchPipedInstancesData): Promise<IPipedInstance[]> {
  return options.isFake ? fetchFakeData(options.delay) : fetchData();
}

async function fetchData(): Promise<IPipedInstance[]> {
  return await fetch(PIPED_VALUES.ENDPOINTS.INSTANCES)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return Promise.reject(data.error);

      saveCachedPipedInstances(data);
      return data as IPipedInstance[];
    });
}

async function fetchFakeData(delay?: number): Promise<IPipedInstance[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pipedInstancesData as IPipedInstance[]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
