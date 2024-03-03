'use client';

import type { IPipedInstance } from '@/types';

import { LocalStoragePassers } from './utils';
import { LOCALSTORAGE_KEYS } from '@/constants';

export function getCachedPipedInstances(): IPipedInstance[] {
  const value = localStorage.getItem(LOCALSTORAGE_KEYS.FAVORITE_STREAMS) || '[]';
  return JSON.parse(value) as IPipedInstance[];
}

export function saveCachedPipedInstances(data: IPipedInstance[]) {
  const passedData = LocalStoragePassers.instancesToCachedPipedInstances(data);
  localStorage.setItem(LOCALSTORAGE_KEYS.CACHED_PIPED_INSTANCES, JSON.stringify(passedData));
}
