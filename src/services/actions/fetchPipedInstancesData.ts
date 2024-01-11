'use server';

import pipedInstancesData from '@/mocks/pipedInstancesData';
import IPipedInstance from '@/types/PipedInstance';

import { DEFAULT_VALUES, PIPED_VALUES } from '@/constants';

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
    .then((data) => data as IPipedInstance[]);
}

async function fetchFakeData(delay?: number): Promise<IPipedInstance[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pipedInstancesData as IPipedInstance[]);
    }, delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY);
  });
}
